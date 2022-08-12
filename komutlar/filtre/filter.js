const { EmbedBuilder } = require('discord.js');
const delay = require('delay');

module.exports = {
    config: {
        name: "filtre",
        description: "Müzik filtresini ayarlarsınız!",
        kategori: "filtre",
        aliases: []
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("Yükleniyor lütfen bekleyin!")
        
        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`Şu anda sırada hiçbir şey yok!`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit("Aynı ses kanalında olmanız gerekmektedir!")

        const filter = args[0];

        if (filter === "off" && queue.filters.size) queue.filters.clear();
        else if (Object.keys(client.distube.filters).includes(filter)) {
            if (queue.filters.has(filter)) queue.filters.remove(filter)
            else queue.filters.add(filter)
        } else if (args[0]) msg.edit(`Filtre bulunamadı!`)

        const embed = new EmbedBuilder()
            .setAuthor({ name: `Şuanki Filtre`, iconURL: `https://cdn.discordapp.com/emojis/741605543046807626.gif`})
            .setDescription(`\🎲 **Filtre:** \`${queue.filters.names.join(", ") || "Normal"}\``)
            .setFooter({ text: `🔩 **Örnek:** ${client.prefix}filtre 3d`})
            .setTimestamp()
            .setColor('#000001');

        await delay(3000)
        msg.edit({ content: ' ', embeds: [embed] })
    } 
};

// github.com/EmirhanSarac/discord-v14-muzik-botu - discord.gg/codare - youtube.com/EmirhanSarac