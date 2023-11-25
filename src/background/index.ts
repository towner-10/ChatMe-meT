import { updateContext } from "../lib/context/context"

console.log('background is running')

chrome.runtime.onMessage.addListener((request) => {
  if (request.type === 'COUNT') {
    console.log('background has received a message from popup, and count is ', request?.count)
  }
  else if (request.type === 'MESSAGE') {
    console.log('background has received a message from contentScript')
    updateContext(request);
  }
})
