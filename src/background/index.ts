import { getMemeSearchTerm, updateContext } from '../lib/context/context'
import { search } from '../lib/imageSearch/bing'

console.log('background is running')

chrome.runtime.onMessage.addListener(async (request) => {
  if (request.type === 'COUNT') {
    console.log('background has received a message from popup, and count is ', request?.count)
  } else if (request.type === 'MESSAGE') {
    console.log('background has received a message from contentScript')
    updateContext(request)
  } else if (request.type === 'SEARCH') {
    console.log('background has received a message from contentScript')
    let searchTerms = await getMemeSearchTerm()

    if (!searchTerms) {
      console.log('searchTerms is null')
      return
    }

    // Check for meme
    const memeRegex = /meme/i

    if (!memeRegex.test(searchTerms)) {
      console.log('searchTerms does not contain meme')
      searchTerms += ' meme'
    }

    console.log('searchTerms is ', searchTerms)
    const images = await search(searchTerms as string, 10)
    console.log(images)

    chrome.runtime.sendMessage({ type: 'SEARCH', images })
  }
})
