require("dotenv").config();
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
  console.log(`Logged in as ${client.user.username}!`);
  client.user.setActivity(settings.prefix + "help to see commands!");
});

client.on("messageCreate", (msg) => {
  if (
    msg.content.toLowerCase().substring(0, settings.prefix.length) ==
    settings.prefix
  ) {
    content = msg.content.toLowerCase().substring(2);

    // commands
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
