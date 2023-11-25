import OpenAI from 'openai'
import { Message } from '../../types/message'
import { Assistant } from 'openai/resources/beta/assistants/assistants'
import { MessageContentText } from 'openai/resources/beta/threads/messages/messages'

// import dotenv from 'dotenv';
// dotenv.config();

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY, // defaults to process.env["OPENAI_API_KEY"]
})

let context: Message[] = [] // Define context as an array of Message type
let keywordsAssistant: Assistant | undefined = undefined
let searchAssistant: Assistant | undefined = undefined
createAssistants()

async function createAssistants() {
  keywordsAssistant = await openai.beta.assistants.create({
    name: 'keywords-assistant',
    instructions:
      'your job is to take in a set set of messages between 2 users and provide me a nothing but a a max of 10 words that provide me with a search term to find relevant memes, always make sure the word meme is at the end',
    tools: [{ type: 'code_interpreter' }],
    model: 'gpt-4',
  })
  searchAssistant = await openai.beta.assistants.create({
    name: 'search-assistant',
    instructions:
      'Given a set of keywords, give me nothing but the single best search prompt that will return the best relevant memes, do not say anything other than the search prompt',
    tools: [{ type: 'code_interpreter' }],
    model: 'gpt-3.5-turbo-1106',
  })
}

function extractDataFromMessages(messages: Message[]): string {
  return messages.map((msg) => `${msg.username}: ${msg.message}`).join('\n')
}

// Function to analyze context using OpenAI's GPT-3 model
async function analyzeContext(messages: Message[]) {
  const dataString = extractDataFromMessages(messages)

  if (keywordsAssistant == undefined) {
    await createAssistants()
  }
  try {
    const thread = await openai.beta.threads.create()
    await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: dataString,
    })
    if (keywordsAssistant) {
      const run = await openai.beta.threads.runs.create(thread.id, {
        assistant_id: keywordsAssistant.id,
      })

      let status = await openai.beta.threads.runs.retrieve(thread.id, run.id)

      return await new Promise<string>((resolve) => {
        const statusChecker = setInterval(async () => {
          status = await openai.beta.threads.runs.retrieve(thread.id, run.id)

          if (status.status == 'completed') {
            const messages = await openai.beta.threads.messages.list(thread.id)
            const messageTextContent = messages.data[0]['content'][0] as MessageContentText

            clearInterval(statusChecker)
            resolve(messageTextContent.text.value)
          }
        }, 1000)
      })
    }
  } catch (error) {
    console.error('Error in calling OpenAI API:', error)
    return undefined
  }
}

async function getSearchTerm(keywords: any) {
  if (searchAssistant == undefined) {
    await createAssistants()
  }
  try {
    const thread = await openai.beta.threads.create()
    await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: keywords,
    })
    if (searchAssistant) {
      const run = await openai.beta.threads.runs.create(thread.id, {
        assistant_id: searchAssistant.id,
      })
      let status = await openai.beta.threads.runs.retrieve(thread.id, run.id)

      return await new Promise<string>((resolve) => {
        const statusChecker = setInterval(async () => {
          status = await openai.beta.threads.runs.retrieve(thread.id, run.id)

          if (status.status == 'completed') {
            const messages = await openai.beta.threads.messages.list(thread.id)
            const messageTextContent = messages.data[0]['content'][0] as MessageContentText

            clearInterval(statusChecker)
            return resolve(messageTextContent.text.value)
          }
        }, 1000)
      })
    }
  } catch (error) {
    console.error('Error in calling OpenAI API:', error)
    return undefined
  }
}

/**
 * Function to update context.
 * @param jsonList - A list of JSON objects.
 */
export async function updateContext(message: Message): Promise<void> {
  console.log('context updated')

  context.unshift(message)
  while (context.length > 10) {
    console.log('context popped')
    context.pop()
  }
  console.log("Context: ",context)
}

export async function getMemeSearchTerm() {
  const keywords = await analyzeContext(context)
  console.log("keywords are: ", keywords )
  return keywords
  //return await getSearchTerm(keywords)
}
