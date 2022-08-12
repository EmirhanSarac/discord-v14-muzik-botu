const { EmbedBuilder } = require("discord.js");

module.exports = {
    config: {
        name: "loop",
        aliases: ["repeat"],
        description: "Şarkıları sürekli tekrar çalmaya ayarlar.",
        kategori: "muzik"

    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("Yükleniyor Lütfen Bekleyin");
        
        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`Şu anda kuyrukta hiçbir şarkı yok.!`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit("Aynı / sesli kanalda olmanız gerekmektedir.")

        if (queue.repeatMode === 0) {
                client.distube.setRepeatMode(message, 1);
                const embed = new EmbedBuilder()
                    .setColor("#000001")
                    .setDescription(`\`🔁\` | **Loop Başarıyla Aktif Edildi!**`)

                msg.edit({ content: ' ', embeds: [embed] });
            } else {
                client.distube.setRepeatMode(message, 0);
                const embed = new EmbedBuilder()
                    .setColor("#000001")
                    .setDescription(`\`🔁\` | **Loop Devredışı!**`)

                msg.edit({ content: ' ', embeds: [embed] });
            }
    }
}
