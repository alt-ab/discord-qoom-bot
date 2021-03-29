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
- [GitHub account](https://github.com/)

**Resources**
- [Official Discord guide](https://discordjs.guide/creating-your-bot/#creating-the-bot-file)
- [Great two part tutorial on creating a Discord bot and hosting](https://medium.com/davao-js/tutorial-creating-a-simple-discord-bot-9465a2764dc0)
- [Another tutorial for a Discord bot with cool pyramid feature](https://workshops.hackclub.com/pyramid_discord_bot/)


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
3. Install dependenies individually with 
```
npm install dotenv
npm install discord.js
npm install --save giphy-js-sdk-core
npm install ms
```
You should have `package.json` and `package-lock.json` files as well
4. Create `bot.js`, `.env`, and `Procfile` files
Do so with `touch <file-name>` or however the IDE is set up
5. In your `.env` file, write your *bot token from the above directions* there in the format
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
//handling Discord, and dotenv, and ms 
require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const ms = require("ms")

//handling Giphy
var GphApiClient = require('giphy-js-sdk-core');
const GIPHY_TOKEN = process.env.GIPHY_TOKEN;
giphy = GphApiClient(GIPHY_TOKEN);
})

//Calling bot's state
client.once('ready', () => {
    console.log(`Blast off!`);
});

client.once('reconnecting', () => {
    console.log(`Reconnecting!`);
});

client.once('disconnect', () => {
    console.log(`Disconnected!`);
});

//Listening for "message" event, and sending your first message!
client.on('message', (message) => {
  mesage.channel.send('Hi there!')
})

//Passing your Discord token
client.login(process.env.DISCORD_TOKEN);
```
2. And you can run your bot locally with `node bot.js`

### First Feature: Giphy Meme Search


### Second Feature: Timer w/ ms package

# Hosting!
## Hosting pt 1: Creating a GitHub respository
Hi there! Quick check in!
Let's configure your Heroku account for hosting your bot!
You need push your code into a GitHub repository for Heroku to read it.
1. First, create an *empty* repository on Github. More documentation can be found [here](https://docs.github.com/en/github/importing-your-projects-to-github/adding-an-existing-project-to-github-using-the-command-line)
2. Title your repository whatever you like! A suggestion would be `discord-giphy-bot`!![image](https://user-images.githubusercontent.com/66260572/112776808-a1988000-900e-11eb-8d32-2f851a52103b.png)
3. Also! Grab GitHub respository's URL ![image](https://user-images.githubusercontent.com/66260572/112776890-d0aef180-900e-11eb-9929-97cc40e40b3d.png)
---
1. Next you want to go to your terminal and intialize your local directory as a Git respository
```git init -b main```
2. Then, add all files to the respository
```git add .```
3. And, commit the staged changes to GitHub
```git commit -m "First commit!"```
4. Next grab your GitHub respository's URL at the top of your page, if you have not yet, and paste that in 
```git remote add origin <REMOTE_URL> //Sets up new remote branch```
5. And verify that branch!
```git remote -v ```
6. Then push your changes!
```git push -u origin main //This pushes your changes specifically up by the origin branch```

In the future for commiting local edits to your GitHub, use 

```
git add .
git commit -m "message"
git push
```
## Hosting pt. 2: Setting up Heroku
Now Heroku can actually read and host your code!
1. In case you have not done it already, set up a Heroku account! You may have to verify your email
2. And install the [Heroku command line](https://devcenter.heroku.com/articles/heroku-cli)
3. Next select the `new` button and `new app` on the top right of your dashboard or if this is your first time using Heroku, select `Create new app` option
4. Name your app the same new your GitHub repository is! (It helps with organization)
5. Go to the Settings tab, and scroll down to hit `Reveal Config Vars`![image](https://user-images.githubusercontent.com/66260572/112776639-38187180-900e-11eb-9ee5-e33f30449a55.png)

5. There, reference your `.env` file, and paste in your API and Discord keys
6. Next, you want to head over to the Deploy tab, and choose the `Connect to GitHub` option![image](https://user-images.githubusercontent.com/66260572/112776973-fa681880-900e-11eb-9368-e420b7b2056e.png)

8. From there you want to sign into your Github and connect your repository!

A good tip to track how Heroku is handling your code, is to run `heroku logs --tail` 

