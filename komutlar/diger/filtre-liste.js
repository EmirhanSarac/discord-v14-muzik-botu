const { EmbedBuilder } = require("discord.js");

module.exports = {
    config: {
        name: "filtre-liste",
        aliases: ["fl"],
        usage: "(komut)",
        kategori: "diger",
        description: "Botun sahip olduğu tüm filtreleri görüntüler.",
    },
    run: async (client, message) => {
        const msg = await message.channel.send("Yükleniyor...");
        const embed = new EmbedBuilder()
            .setColor('#FD0A0A')
            .setAuthor({ name: `Filtreler`, iconURL: message.guild.iconURL({ dynamic: true })})
            .setDescription(`\`${client.prefix}3d\`\n\`${client.prefix}bassboost\`\n\`${client.prefix}echo\`\n\`${client.prefix}speedup\`\n\`${client.prefix}slowed\`\n\`${client.prefix}reverse\`\n\`${client.prefix}surround\``)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 2048 }))
            .setFooter({ text: `Örnek Kullanım: ${client.prefix}filtre bassboost` })
            .setTimestamp()

            msg.edit({ content: ' ', embeds: [embed] })
        }
}; 

// github.com/EmirhanSarac/discord-v14-muzik-botu - discord.gg/codare - youtube.com/EmirhanSarac