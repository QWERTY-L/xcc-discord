require('dotenv').config()
const Discord = require("discord.js");
const settings = require('./settings.json');

var intent = new Discord.Intents(32767); //ALL INTENTS
const client = new Discord.Client({ intents: intent });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`);
});

client.on('messageCreate', msg => {
  if (msg.content.toLowerCase().substring(0, settings.prefix.length) == settings.prefix) {

    content = msg.content.toLowerCase().substring(2);

    //COMMANDS
    if (content === "link") {
	msg.reply("https://github.com/QWERTY-L/xcc-discord");
    }
    if (content === "ping") {
        msg.reply("pong!");
    }



  }
});

// login with token from .env
client.login(process.env.TOKEN);
