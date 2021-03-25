How to Make a Discord Bot (QOOM Style)
======
## You will learn:
- _How to make a Discord bot (obviously)_
- Hosting
- How to connect APIs
- Message Detection (public speaking, etc.)

## Prerequisites and Resources:

- [QOOM Account!](qoom.io)
- Discord Account
- [Giphy Account (feature)](https://developers.giphy.com/docs/api#quick-start-guide)
- [Heroku Account (for hosting)](https://devcenter.heroku.com/start)
- Excitement to Learn!
- [Node.js installed](http://nodejs.org/)


## Instructions
### Create Bot (and Test Server) in Discord
1. Let's create a Discord server to test and implement our bot in.
2. Now make a Bot. Sign into your [Discord's developer portal](https://discord.com/developers/applications)
3. Click "New Application", type a name (you could name it whatever you'd like) and select "Create".
4. On the left there will be some options -- select "Bot", then "Add Bot", and name the bot. 
5. Save the changes and you now have a registered bot.
6. To connect the bot to your server, go to "OAuth2", check the "bot" checkbox and then copy the URL to open in another tab. Click "Authorize" and select the server you made.
>![image](https://user-images.githubusercontent.com/66260572/112403255-7814e700-8ce4-11eb-8db1-53687808d781.png)
>- Later, you will need the token from this page to connect the code with the bot later.

### Setting up coding environment 
Great job! First we will learn how to set up the Discord bot environment
1. First create a folder in your computer 
```
mkdir <discord-bot>
```
2. Set up your npm (node.js handle) project with `npm init -y`
3. Install all dependenies individually with 
```
npm install dotenv
npm install discord.js
npm install --save giphy-js-sdk-core
```
You should have `package.json` and `package-lock.json` files
4. Create `bot.js`, `.env`, and `Procfile` files
Do so with `touch <file-name>`
5. In your `.env` file, paste your *bot token from the above directions* there in the format
```
DISCORD_TOKEN=<bot-token-here>
```
6. Then in the same file, paste your Giphy Developers token 
```
GIPHY_TOKEN=<giphy-token-here>
```
7. In your `Procfile` - which is the file Heroku must read to host - insert 
```
worker: node bot.js
```
>Now you are finally ready to start coding your bot in `bot.js`!
### Coding your first Discord bot message
1. For the first code ever (woohoo!), insert this!
```
// Imports dotenv and discord modules
import dotenv from 'dotenv'
import Discord from 'discord.js'

// Read config from .env and login to the Discord API
dotenv.config()
const client = new Discord.Client()
client.login(process.env.TOKEN)

// Listen for a 'ready' event and execute a callback when it's fired
client.on('ready', () => {
  console.log('Ready!')
})

// Listen for a 'message' event and execute a callback when it's fired
client.on('message', (msg) => {
  const channel = msg.channel as Discord.TextChannel
  channel.send('Hi there!')
})
```
### First Feature: Giphy Meme Search
### Second Feature: Timer w/ ms package
