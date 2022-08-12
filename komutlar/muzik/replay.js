const { EmbedBuilder } = require("discord.js");

module.exports = {
    config: {
        name: "replay",
        aliases: ["tekrarla", "tekrar"],
        description: "Çalan şarkıyı tekrarlar.",
        kategori: "muzik"

    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("Yükleniyor Lütfen Bekleyin");

        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`Şu anda kuyrukta hiçbir şey yok.!`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit("Aynı / sesli kanalda olmanız gerekmektedir.")

        await queue.seek(0)

        const embed = new EmbedBuilder()
            .setColor("#000001")
            .setDescription("\`🔁\` | **Başarıyla şarkı tekrar çalınıyor**")

        msg.edit({ content: ' ', embeds: [embed] });
        
    }
}


// github.com/EmirhanSarac/discord-v14-muzik-botu - discord.gg/codare - youtube.com/EmirhanSarac