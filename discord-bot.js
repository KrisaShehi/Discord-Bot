const { Client, GatewayIntentBits } = require("discord.js");
const axios = require("axios");
require('dotenv').config();
const token = process.env.TOKEN;

const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
client.on("ready", () => {
  console.log("The AI bot is online");
});
client.on("messageCreate", (message) => {
  if (message.content.substring(0, 1) === "!") {
    const prompt = message.content.substring(1);
    const messageSplit = prompt.split(" ");
    const wolfarmQuery = messageSplit.join("+");
    const config = {
      method: "get",
      url: `http://api.wolframalpha.com/v1/result?appid=GL898E-KHXHTQPH4P&i=${wolfarmQuery}%3f`,
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if (response.data) {
          message.reply(JSON.stringify(response.data));
        } else {
        }
      })
      .catch((error) => {
        message.reply("No short answer available");
      });
  }
});
client.login(token);
