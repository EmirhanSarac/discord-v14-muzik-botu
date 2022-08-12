const { EmbedBuilder } = require("discord.js");

module.exports = {
    config: {
        name: "volume",
        aliases: ["vol", "v", "ses"],
        description: "Şarkının ses seviyesini ayarlar.",
        kategori: "muzik"
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("Yükleniyor Lütfen Bekleyin");

        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`Şu anda kuyrukta hiçbir şey yok!`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit("Aynı / sesli kanalda olmanız gerekmektedir.")

        const volume = parseInt(args[0]);

        if (!volume) {
            const embed = new EmbedBuilder()
                .setColor("#000001")
                .setDescription(`Şu anki **ses seviyesi** : \`%${queue.volume}\``)

            return msg.edit({ content: ' ', embeds: [embed] });
        }

        if (isNaN(volume)) {
            const embed = new EmbedBuilder()
                .setColor("#000001")
                .setDescription(`Lütfen geçerli bir sayı giriniz!`);

            return msg.edit({ content: ' ', embeds: [embed] });
        }

        if (Number(volume) < 1 || Number(volume) > 100) return msg.edit(`Lütfen 1 ile 100 arasında bir sayı giriniz!`)

        client.distube.setVolume(message, volume);

        const embed = new EmbedBuilder()
            .setColor("#000001")
            .setDescription(`\`🔊\` | **Ses başarıyla \`%${args[0]}\` olarak ayarlandı!**`)

        msg.edit({ content: ' ', embeds: [embed] });

    }
}


// github.com/EmirhanSarac/discord-v14-muzik-botu - discord.gg/codare - youtube.com/EmirhanSarac