require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

var GphApiClient = require('giphy-js-sdk-core');
const GIPHY_TOKEN = process.env.GIPHY_TOKEN;
giphy = GphApiClient(GIPHY_TOKEN);

const PORT = process.env.PORT || 3000;
const prefix = process.env.prefix;

client.on(PORT, () => {
    console.log(`App is running on port ${ PORT }`);
});

client.once('ready', () => {
  console.log(`Blast off!`);
});
//* Logged in as ${client.user.tag}

client.once('reconnecting', () => {
    console.log(`Reconnecting!`);
});

client.once('disconnect', () => {
    console.log(`Disconnected!`);
});


client.on('message', message => {
  
  if (message.content.startsWith(`${prefix}ping`)) {
      message.channel.send(":ping_pong: pong!")
  }
  
  if (message.content.startsWith(`${prefix}gif`)) {
      const content = message.content.slice(prefix.length).split(' ');
      console.log(content);
      giphy.search('gifs', {"q":content})
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
  
});
          
client.login(process.env.DISCORD_TOKEN);
