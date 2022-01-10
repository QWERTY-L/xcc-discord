require('dotenv').config()
const Discord = require("discord.js");
const settings = require('./settings.json');
const { createCommand, commandHandler }= require("./commandHandler")


const command1 = new createCommand("ping", "Returns Pong", null)
const command2 = new createCommand("pong", "Returns Ping", null)
const command3 = new createCommand("help", "Return a list of help commands", null)
const handler = new commandHandler([command1, command2, command3]);




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


  } else if (commandName === "pong") {
      interaction.reply({
          content: "ping",
          ephermeral: false,
      })
  }; 
});




client.on("messageCreate", msg => {
    if (msg.content.toLowerCase().substring(0, settings.prefix.length) == settings.prefix) {
        content = msg.content.toLowerCase().substring(2);
        if (!(handler.verifyCommandName(content))) {
            msg.reply(handler.returnCommandList()); 
        }; 

        switch (content) {
            case "ping":
                msg.reply("pong");
				break;
            
            case "pong":
                msg.reply("ping");
				break;

            case "help":
                msg.reply(handler.returnCommandList());
				break;
        };
    }; 
});


// login with token from .env
client.login(process.env.TOKEN);