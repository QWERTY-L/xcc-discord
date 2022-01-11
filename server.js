require("dotenv").config();
const fs = require("fs");
const Discord = require("discord.js");
const settings = require("./settings.json");
const { Client } = require("pg");

var intent = new Discord.Intents(32767); //ALL INTENTS
const client = new Discord.Client({ intents: intent });

const connectionString = process.env.DATABASE_URL;

// create db connection
const db = new Client({
  connectionString,
});

// connect to db
db.connect((err) => {
  if (err) {
    console.error("db connection error", err.stack);
  } else {
    console.log("db connected");
  }
});

client.on("ready", () => {
  console.log(`discord logged in as ${client.user.username}!`);
  client.user.setActivity(settings.prefix + "help to see commands!");
});

client.on("guildMemberAdd", (member) => {
  const channel = member.guild.channels.cache.find(
    (channel) => channel.name == settings.greetingChannel
  );
  if (!channel) return;

  channel.send(`Welcome to the server, ${member.toString()}!`);
});

client.on("messageCreate", (msg) => {
  if (
    msg.content.toLowerCase().substring(0, settings.prefix.length) ==
    settings.prefix
  ) {
    content = msg.content.substring(2);
    args = content.split(" ");

    //COMMANDS
    if (args[0] === "link") {
      msg.reply("https://github.com/QWERTY-L/xcc-discord");
    }
    if (args[0] === "ping") {
      msg.reply("pong!");
    }
    if (args[0] === "set") {
      if (check(msg)) {
        set(msg, args);
      } else {
        msg.reply("Sorry not an admin.");
      }
    }
    if (args[0] == "check") {
      if (check(msg)) {
        msg.reply("You are an admin");
      } else {
        msg.reply("Sorry not an admin.");
      }
    }
  }
});

//checks if the author of a message is an admin. Returns a boolean.
function check(msg) {
  return settings.admins.includes(msg.author.tag);
}

function set(msg, args) {
  settings[args[1]] = args[2];
  fs.writeFile("./settings.json", JSON.stringify(settings), (error) => {
    if (error) return console.log(error);
  });
  msg.reply(`set \`${args[1]}\` to \`${args[2]}\``);
}

// login with token from .env
client.login(process.env.TOKEN);
