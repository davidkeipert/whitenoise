const Discord = require("discord.js");
const { prefix, token } = require("./config.json");

const client = new Discord.Client();
var connection;

async function play(voiceChannel) {
    const connection = await voiceChannel.join();
  const dispatcher = connection.play("./audio/audio.mp3");
  dispatcher.on("finish", () => {
    console.log("finished playing!");
  });

  dispatcher.destroy();
}

client.login(token);

client.on("message", async (message) => {
  if (!message.guild) return;

  if (message.content === "/join") {
    // only join sender's voice channel if they are in one themselves
    if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join();
      console.log('joined voice channel');


    } else {
      message.reply("You need to join a voice channel first!");
    }
  }

  if (message.content === "/play") {
    voiceChannel = message.member.voice.channel;
    play(voiceChannel);
  }
});
