const { EmbedBuilder } = require("discord.js");

module.exports = {
    config: {
        name: "nowplaying",
        aliases: ["np", "now"],
        description: "Şuan çalan şarkıyı görüntüler.",
        kategori: "muzik"

    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("Yükleniyor Lütfen Bekleyin");

        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`Şu anda kuyrukta hiçbir şey yok!`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit("Aynı / sesli kanalda olmanız gerekmektedir.")

        const uni = `${queue.songs[0].playing ? '⏸️ |' : '🔴 |'}`;
        const part = Math.floor((queue.currentTime / queue.songs[0].duration) * 30);

        const embed = new EmbedBuilder()
            .setAuthor({ name: queue.songs[0].playing ? 'Şarkı Duraklatıldı...' : 'Şarkı Çalıyor...', iconURL: "https://cdn.discordapp.com/emojis/741605543046807626.gif"})
            .setColor('#000001')
            .setDescription(`**[${queue.songs[0].name}](${queue.songs[0].url})**`)
            .setThumbnail(`${queue.songs[0].thumbnail}`)
            .addFields({ name: 'Yükleyici:', value: `[${queue.songs[0].uploader.name}](${queue.songs[0].uploader.url})`, inline: true })
            .addFields({ name: 'Şarkıyı isteyen:', value: `${queue.songs[0].user}`, inline: true })
            .addFields({ name: 'Ses:', value: `${queue.volume}%`, inline: true })
            .addFields({ name: 'Görüntülenme Sayısı', value: `${queue.songs[0].views}`, inline: true })
            .addFields({ name: 'Beğeni Sayısı:', value: `${queue.songs[0].likes}`, inline: true })
            .addFields({ name: 'Filtre:', value: `${queue.filters.names.join(', ') || "Normal"}`, inline: true })
            .addFields({ name: `Geçerli Süre: \`[${queue.formattedCurrentTime} / ${queue.songs[0].formattedDuration}]\``, value: `\`\`\`${uni} ${'─'.repeat(part) + '🎶' + '─'.repeat(30 - part)}\`\`\``, inline: false })
            .setTimestamp()

        msg.edit({ content: ' ', embeds: [embed] });
    }
}
