const Discord = require("discord.js");
var config = require('./config.json');
const settings = require('./settings.json');

var intent = new Discord.Intents(32767); //ALL INTENTS
const client = new Discord.Client( {intents: intent} );

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`);
});

client.on('messageCreate', msg => {
  if (msg.content.toLowerCase().substring(0, settings.prefix_len) == settings.prefix) {

    content = msg.content.toLowerCase().substring(2);
    
    //COMMANDS
    if(content === "ping"){
        msg.reply("pong!");
    }

  }
});

client.login(config.TOKEN);