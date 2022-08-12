const { EmbedBuilder } = require("discord.js");

module.exports = {
    config: {
        name: "skip",
        aliases: ["s"],
        description: "Çalan şarkıyı geçersiniz.",
        kategori: "muzik"
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("Yükleniyor Lütfen Bekleyin");

        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`Şu anda kuyrukta hiçbir şey yok!`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit("Aynı / sesli kanalda olmanız gerekmektedir.")

        if (queue.songs.length === 1 && queue.autoplay === false) {
                const embed = new EmbedBuilder()
                    .setColor("#000001")
                    .setDescription("\`🚨\` | **Kuyrukta başka şarkı bulunamadı!**")

                msg.edit({ content: ' ', embeds: [embed] });
        } else {
            client.distube.skip(message)
                .then(song => {
                    const embed = new EmbedBuilder()
                        .setColor("#000001")
                        .setDescription("\`⏭\` | **Şarkı başarıyla geçildi!**")

                    msg.edit({ content: ' ', embeds: [embed] });
                });
        }
    }
}