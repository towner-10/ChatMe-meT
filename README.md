# ![Banner](/assets/banner.png)

## Inspiration–“💀” “that’s crazy” “lmao” just say you’re not funny.

The group chat is firing up. Messages are flying at Mach 3. Before you know it, a meme war has ensued, and you have no good response in your arsenal. Lucky for you, ChatMe-meT does.

## Installing

1. Check if your `Node.js` version is >= **14**.
2. Change or configurate the name of your extension on `src/manifest`.
3. Run `npm install` to install the dependencies.

## Developing

run the command

```shell
$ cd chatme-met

$ npm run dev
```

### Chrome Extension Developer Mode

1. set your Chrome browser 'Developer mode' up
2. click 'Load unpacked', and select `chatme-met/build` folder

### Nomal FrontEnd Developer Mode

1. access `http://0.0.0.0:3000/`
2. when debugging popup page, open `http://0.0.0.0:3000//popup.html`
3. when debugging options page, open `http://0.0.0.0:3000//options.html`

## Packing

After the development of your extension run the command

```shell
$ npm run build
```

## Explanation–As Easy as 1-2-Meme

ChatMe-meT is a Google Chrome extension that works hard at curating meme responses to messages so you don’t have to. The process is distilled down to three easy steps:

**1. Activate the extension in the window of your chat.** From here, ChatMe-meT reads the last 10 messages to gain context for the conversation.

**2. Select your desired meme genre.** Choose from _Facebook Mom_, _Dank_, _Surrealist_, _Wholesome_, and _Redditor_ to get the exact style of meme you’re looking for. ChatMe-meT then uses these preferences to compile a gallery of real Internet memes, ripe for the picking.

**3. Add a desired meme to your clipboard.** Click on any image to send to your friends, relatives, and colleagues, and prove your unfaltering sense of humour.

## How We Built It

ChatMe-meT is built off of React, TS, and Vite. Using this tooling we developed a Chromium-based extension that can be easily added to most browsers and can read the current status of the chat you are in. It uses application-specific DOM query selectors to find the sender and message data that will be added as context for the meme finder algorithm™. When you need a fresh new meme for your chat, a request is made to OpenAI using GPT-4 to deliver the best memeable keywords it can find based on the context of the chat. Using the resulting keywords, a search is performed across the internet to find what you need. Cool memes are then found.

## Accomplishments

The process in which we scrape the DOM ensures we get all the data we need and none we don’t need. Many chat applications, often include many features like reactions, images and emojis and we need to make sure that we can interpret those but also not include unnecessary images or reactions in our prompt. By building out the robust scraping tool, we can build out the application to support as many chat messaging platforms as we want. 

With the meme generation genres, we wanted to make sure the image results were unique. We tuned the model to ensure that every genre/personality would be different and funny in its own right.

With the extension-based approach we took instead of, for example, a bot, we built an application that isn’t just limited to public multiuser channels but also private channels as well where you will often need a funny meme as well. It is also highly expandable and can interact with multiple websites as well.

## Challenges we ran into
As it turns out, searching for memes is actually quite difficult. Often the funniest memes are not neatly categorized or labeled in a way that is search engine friendly, so we had to do a lot of tuning to our search prompts to avoid _all_ of our memes looking like facebook mom memes.

## What's next for ChatMe-meT

While ChatMe-meT is a novelty idea, it sheds light on an unexplored area of integrated AI assistance. Many software tools ranging from email clients to code editors are rapidly integrating AI enhancements that serve as the user’s sidekick, but this has seldom applied to messaging platforms. A tool like ChatMe-meT that utilizes techniques found in AI autocomplete, but applies new media forms could remarkably enhance the way we communicate on a daily basis.
