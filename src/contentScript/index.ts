import { Message } from '../types/message'

console.info('contentScript is running')

const messageClassSelector = '.messageListItem__6a4fb'
const messageUsername = 'span[id^="message-username-"]'
const messageContentSubstringSelector = 'div[id^="message-content-"]'
const messageAccessoriesSelector = 'div[id^="message-accessories-"]'

// Read content from discord chat and send it to background script
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node instanceof HTMLElement) {
        if (node.matches(messageClassSelector)) {
          const username = node.querySelector(messageUsername)
          const message = node.querySelector(messageContentSubstringSelector)
          const accessories = node.querySelector(messageAccessoriesSelector)

          let messageContent: Message = {
            type: 'MESSAGE',
            username: '',
            message: '',
            accessories: [],
          }

          if (username) {
            // Get all span elements from username
            const span = username.querySelector('span')

            if (span) {
              // Get all text from span
              const text = span.innerText
              messageContent.username = text
            }
          }
          if (message) {
            // Get all span elements from message
            const spans = message.querySelectorAll('span')

            // Get all text from spans
            const text = Array.from(spans)
              .map((span) => span.innerText)
              .join('')
              .replace(/\s+/g, ' ')
              .replace('(edited)', '')
            messageContent.message = text
          }
          if (accessories) {
            // Get all img elements from message
            const imgs = accessories.querySelectorAll('img')

            // Get all src from imgs
            const srcs = Array.from(imgs).map((img) => img.src)
            messageContent.accessories = srcs
          }

          console.info(messageContent)

          // Send message to background script
          chrome.runtime.sendMessage(messageContent)
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
