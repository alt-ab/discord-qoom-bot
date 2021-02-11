# qoom-creator
## Alternative code for [Alexa's](https://github.com/alt-ab) and [Adelene's](https://github.com/jenybear) Discord Bot for Qoom Inc.
<br>

### To edit the bot online 

1. just edit the code straight for [this repo](https://github.com/alt-ab/discord-qoom-bot) and commit it

2. To check if running on [Heroku Activity](https://dashboard.heroku.com/apps/discord-qoom-bot/activity)

(I set up Heroku through a remote git branch via git remote add heroku https://git.heroku.com/discord-qoom-bot.git. and added that app to Heroku with heroku git:remote -discord-qoom-bot)

<br>

---

<br>

### To edit and debug locally

1. Clone the repo
```
git clone https://github.com/alt-ab/discord-qoom-bot.git
```

<br>
2. Download dependencies: dotenv, node.js, GIPHY packager, and discord.js (in the future will move to Docker)

```
npm init

npm install dotenv

npm install discord.js

npm install --save giphy-js-sdk-core
```

<br>
3. To run locally 

```
node bot.js
```

<br>
4. To get most recent code

```
git pull
```

<br>
5. To push back to the GitHub file

```
git add .
git commit -m "<put something in here>"
git push master
```

