const { EmbedBuilder } = require("discord.js");

module.exports = {
    config: {
        name: "previous",
        aliases: ["prev", "önceki"],
        description: "Sıradaki önceki şarkıyı çalar.",
        kategori: "muzik"

    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("Yükleniyor Lütfen Bekleyin");

        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`Şu anda kuyrukta hiçbir şey yok.!`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit("Aynı / sesli kanalda olmanız gerekmektedir.")

        if (queue.previousSongs.length == 0) {
                const embed = new EmbedBuilder()
                    .setColor("#000001")
                    .setDescription("\`🚨\` | **Önceden çalınan şarkı bulunamadı!**")

                msg.edit({ content: ' ', embeds: [embed] });
        } else {
            await client.distube.previous(message)
                .then(song => {
                    const embed = new EmbedBuilder()
                        .setColor("#000001")
                        .setDescription("\`⏮\` | **Önceki çalınan şarkıya başarıyla geçilmiştir**")

                    msg.edit({ content: ' ', embeds: [embed] });
            });
        }
    }
}
