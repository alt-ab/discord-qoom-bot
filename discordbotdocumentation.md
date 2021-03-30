How to Make a Discord Bot
======
## You will learn:
- _How to make a Discord bot (obviously)_
- Hosting
- How to connect APIs
- Message Detection (public speaking, etc.)

## Prerequisites and Resources:

- [QOOM Account](qoom.io)!
- [Discord Account](https://discord.com/)
- [Giphy Account (feature)](https://developers.giphy.com/docs/api#quick-start-guide)
- [Heroku Account (for hosting)](https://devcenter.heroku.com/start)
- [Node.js installed](http://nodejs.org/)
- [GitHub account](https://github.com/)
- And most importantly, an excitement to Learn!

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
![image](https://user-images.githubusercontent.com/66260572/112778789-4cab3880-9013-11eb-8697-03588a03f351.png)
- Later, you will need the token from this page to connect the code with the bot later.

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
4. In your folder, create `bot.js`, `.env`, `Procfile`, and `.gitignore` files
5. Create `.env` file and write your *bot token from the above directions* there in the format
```
DISCORD_TOKEN=<bot-token-here>
GIPHY_TOKEN=<giphy-token-here>
prefix=$
```
7. In your `Procfile` - which is the file Heroku must read to host - insert 
```
worker: node bot.js
```
8. In your `.gitignore` file the following. **Please note that `.env` is vitally important to add**
```
.env
node_modules
```
>Now you are finally ready to start coding your bot in `bot.js`!
### Coding your first Discord bot message
1. For the first code ever (woohoo!), insert this your `bot.js` file!
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
  
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
})

//Passing your Discord token
client.login(process.env.DISCORD_TOKEN);
```
>And you can run your bot locally with `node bot.js`

### First Feature: Giphy Meme Search
Ok now the hard part is over!
Now we need to have it so when our bot recognizes a specific calling, it will send out a gif!
1. First, inside the messages function, we'll have it so the bot will register when its prefix is called 
```
if (message.content.includes(`${prefix}gif)) {
    ...
}
```
2. Then, inside the if statement, we want our bot to read the content sent out with the command, for example, `$gif dogs`, and send a dog gif!
```
//inside the function add...
    const content = message.content.slice(prefix.length).split(' ');
    giphy.search('gifs', { "q": content })
```
3. Then we want to send that content to the Giphy API, which returns a number of files of gifs, so the bot needs to randomly pick one!
```
//again in the function add...
.then((response) => {
    var totalResponses = response.data.length;
    var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
    var responseFinal = response.data[responseIndex];
    message.channel.send({
        files: [responseFinal.images.fixed_height.url]
    })
```
4. A good idea is add a catch function in order to catch any errors 
```
//and finally the add...
.catch((err) => {
    message.channel.send('Error sorry');
    console.log(err);
})
```
In total, your `bot.js` message function should look like this:
```
//Listening for "message" event, and sending your first message!
client.on('message', (message) => {
  mesage.channel.send('Hi there!')
  
  if (message.content.includes(`${prefix}gif)) {
        const content = message.content.slice(prefix.length).split(' ');
        giphy.search('gifs', { "q": content })
            .then((response) => {
                var totalResponses = response.data.length;
                var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
                var responseFinal = response.data[responseIndex];
                message.channel.send({
                    files: [responseFinal.images.fixed_height.url]
                })
            }).catch((err) => {
                message.channel.send('Error sorry');
                console.log(err);
            })
    }
})

```

### Second Feature: Timer w/ ms package
Alright now let's work on the timer feature!
1. Go back into the message function and add another if statement, this time the bot should be looking for a message containing "timer"
```
if (message.content.includes(`${prefix}timer)) {
    ...
}
```
2. Next, the program needs to break the returning message array into identifying features: time for alarm and reason
```
let time = args[0]
//Here, the bot returns a message if the user does not specify a time
if (!time) return message.reply("You need to specify the time with a number and the duration. For example, `5s` for 5 seconds!")
//And if they do not add a unit to the integer
if (ms(time) > ms("1d")) return message.reply("You can't set an alarm longer than 1 day.")

let reason = args.slice(1).join(' ')
if (!reason) return message.reply("Reason for alarm")
```
3. Then, create an embed, which another way to send Discord messages
```
const embed = new Discord.MessageEmbed()
    //The below code is adding more characteristics to the embed
    .setAuthor(`${message.author.tag} Alarm`, message.author.displayAvatarURL())
    .setColor("00ffcc")
    //Here, the program is referencing the time and reason that was given by the author
    .setDescription(`Time: \`${time}\`\nReason: \`${reason}\``)
    .setTimestamp()
message.channel.send(embed)
```
4. Now, the last part is to have the bot send out a message after the given time. Because of ms, that part is basically done in two lines
```
setTimeout(() => {
...
},ms(time))
```
5. And inside that, the bot will send another embed to the user when the timer is over
```
const embed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag} Your alarm has ended.`, message.author.displayAvatarURL())
    .setColor("00ffcc")
    .setDescription(`Time: \`${time}\`\nReason: \`${reason}\`\nAlarm set in server: \`${message.guild.name}\``)
    .setTimestamp()
message.channel.send(embed),
message.author.send(embed)
```
To summarize, your code for the timer feature should look like this!
```
if (message.content.includes(`${prefix}timer)) {

        let time = args[0]
        if (!time) return message.reply("You need to specify the time with a number and the duration. For example, `5s` for 5 seconds!")
        if (ms(time) > ms("1d")) return message.reply("You can't set an alarm longer than 1 day.")

        let reason = args.slice(1).join(' ')
        if (!reason) return message.reply("Reason for alarm")

        const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag} Alarm`, message.author.displayAvatarURL())
            .setColor("00ffcc")
            .setDescription(`Time: \`${time}\`\nReason: \`${reason}\``)
            .setTimestamp()
        message.channel.send(embed)

        setTimeout(() => {
            const embed = new Discord.MessageEmbed()
                .setAuthor(`${message.author.tag} Your alarm has ended.`, message.author.displayAvatarURL())
                .setColor("00ffcc")
                .setDescription(`Time: \`${time}\`\nReason: \`${reason}\`\nAlarm set in server: \`${message.guild.name}\``)
                .setTimestamp()
            message.channel.send(embed),
            message.author.send(embed)
        }, ms(time))
    }
```
And remember, that should all be inside the message function!

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
```
git init -b main
```

2. Then, add all files to the respository
```
git add .
```

3. And, commit the staged changes to GitHub
```
git commit -m "First commit!"
```

4. Next grab your GitHub respository's URL at the top of your page, if you have not yet, and paste that in 
```
git remote add origin <REMOTE_URL> //Sets up new remote branch
```

5. And verify that branch!
```
git remote -v 
```

6. Then push your changes!
```
git push -u origin main //This pushes your changes specifically up by the origin branch
```

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

>A good tip to track how Heroku is handling your code, is to run `heroku logs --tail` 

# Completion
🎉
Congratulations! You have now created your own hosted Discord bot! 

You might be wondering, what are the next steps? 
Well now that you understand the basics of the Discord framework, you can start implementing more features to your bot!

We hope you enjoyed this tutorial and had fun creating your bot!
