require('dotenv').config()
const Discord = require("discord.js");
const settings = require('./settings.json');

var intent = new Discord.Intents(32767); //ALL INTENTS
const client = new Discord.Client({ intents: intent });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`);
  client.user.setActivity(settings.prefix + "help to see commands!");
});

client.on('guildMemberAdd', member =>{

   const channel = member.guild.channels.cache.find(channel => channel.name == "general")
   if(!channel) return;

   channel.send(`Welcome to the server, ${member.toString()}!`)
   console.log(128)

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
