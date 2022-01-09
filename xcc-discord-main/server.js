require('dotenv').config()
const Discord = require("discord.js");
const settings = require('./settings.json');

var intent = new Discord.Intents(32767); //ALL INTENTS
const client = new Discord.Client({ intents: intent });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`);
  const guildId = '746380933552406669'; 
  const guild = client.guilds.cache.get(guildId);

  let commands
  if (guild) {
    commands = guild.commands;
  } else {
    commands = client.application?.commands;
  }


  commands?.create({
    name: "ping",
    description: "replies pong",
  }); 
});



client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand) {
    return
  }; 
  const { commandName, options } = interaction; 

  if (commandName === "ping") {
    interaction.reply({
      content: "pong",
      ephermeral: false,
    });
  }; 
});







// login with token from .env
client.login(process.env.TOKEN);