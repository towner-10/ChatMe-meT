console.info('contentScript is running')

const messageClassSelector = '.messageListItem__6a4fb'
const messageContentSubstringSelector = 'div[id^="message-content-"]'

// Read content from discord chat and send it to background script
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node instanceof HTMLElement) {
        if (node.matches(messageClassSelector)) {
          const message = node.querySelector(messageContentSubstringSelector)
          if (message) {
            console.info(message)
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
