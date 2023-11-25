console.info('contentScript is running')

const messageClassSelector = '.messageListItem__6a4fb'
const messageContentSubstringSelector = 'div[id^="message-content-"]'
const messageAccessoriesSelector = 'div[id^="message-accessories-"]'

// Read content from discord chat and send it to background script
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node instanceof HTMLElement) {
        if (node.matches(messageClassSelector)) {
          const message = node.querySelector(messageContentSubstringSelector)
          const accessories = node.querySelector(messageAccessoriesSelector)
          if (message) {
            // Get all span elements from message
            const spans = message.querySelectorAll('span')

            // Get all text from spans
            const text = Array.from(spans)
              .map((span) => span.innerText)
              .join('')
              .replace(/\s+/g, ' ')
              .replace('(edited)', '')
            // Send message to background script
            console.info({ type: 'MESSAGE', message: text, dom: message })

            chrome.runtime.sendMessage({ type: 'MESSAGE', message: text })
          }
          if (accessories) {
            // Get all img elements from message
            const imgs = accessories.querySelectorAll('img')

            // Get all src from imgs
            const srcs = Array.from(imgs).map((img) => img.src)

            if (srcs.length > 0) {
              // Send message to background script
              console.info({ type: 'IMAGE', sources: srcs, dom: accessories })
            }
          }
        }
      }
    })
  })
})

observer.observe(document.body, {
  childList: true,
  subtree: true,
})

// Send message to background script
chrome.runtime.sendMessage({ type: 'CONTENT_SCRIPT' })

// Receive message from background script
chrome.runtime.onMessage.addListener((request) => {
  if (request.type === 'COUNT') {
    console.log(
      'contentScript has received a message from background, and count is ',
      request?.count,
    )
  }
})
