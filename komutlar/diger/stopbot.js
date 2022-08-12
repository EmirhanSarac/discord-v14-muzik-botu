const chalk = require('chalk');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    config: {
        name: "restart",
        description: "bot kapatma!",
        kategori: "diger",
        aliases: ["stopbot"]
    },
    run: async (client, message, args) => {
    if(message.author.id != client.sahip) return message.channel.send("günün türkosu selam naber?")

    const restart = new EmbedBuilder()
        .setDescription("**Bot kapatılıyor!!!!**")
        .setColor("#000001");

    await message.channel.send({ embeds: [restart] });
        console.log(chalk.red(`Bot Yeniden Başlatılıyor...`));
            
    process.exit();
    }
};

// github.com/EmirhanSarac/discord-v14-muzik-botu - discord.gg/codare - youtube.com/EmirhanSarac