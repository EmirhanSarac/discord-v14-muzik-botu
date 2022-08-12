const { EmbedBuilder } = require("discord.js");
const { readdirSync } = require("fs");
const { stripIndents } = require("common-tags");
const chalk = require("chalk");

module.exports = {
    config: {
        name: "help",
        aliases: ["h", "yardım", "commands"],
        usage: "(komut)",
        kategori: "diger",
        description: "Yardım komutu.",
    },
    run: async (client, message, args) => {
        const embed = new EmbedBuilder()
            .setColor('#000001')
            .setAuthor({ name: `${message.guild.members.me.displayName} Yardım komutu!`, iconURL: message.guild.iconURL({ dynamic: true })})
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 2048 }));

        if(!args[0]) {
            const categories = readdirSync("./komutlar/")

            embed.setDescription(`Ön-Ekim: **${client.prefix}**`)
            embed.setFooter({ text: `© ${message.guild.members.me.displayName} | Toplam Komut: ${client.commands.size}`, iconURL: client.user.displayAvatarURL({ dynamic: true })});

            categories.forEach(kategori => {
                const dir = client.commands.filter(c => c.config.kategori === kategori)
                const capitalise = kategori.slice(0, 1).toUpperCase() + kategori.slice(1)
                try {
                    embed.addFields({ name: `❯ ${capitalise} [${dir.size}]:`, value: dir.map(c => `\`${c.config.name}\``).join(" "), inline: false })
                } catch(e) {
                    console.log(e)
                }
            })

            return message.channel.send({ embeds: [embed] })
        } else {
            let command = client.commands.get(client.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
            if(!command) return message.channel.send({ embeds: [embed.setTitle("Geçersiz Komut.").setDescription(`Komut listesini görmek için \`${client.prefix}help\` yazınız!`)] })
            command = command.config

            embed.setDescription(stripIndents`Prefix: \`${client.prefix}\`\n
            **Komut:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}
            **Açıklama:** ${command.description || "Açıklama Bulunamadı."}
            **Kullanımı:** ${command.usage ? `\`${client.prefix}${command.name} ${command.usage}\`` : "Bulunamadı"}
            **Diğer kullanımları:** ${command.aliases ? command.aliases.join(", ") : "Bulunmamaktadir."}`)
            embed.setColor("#FD0A0A")
            return message.channel.send({ embeds: [embed] })
        }
    }
}

// github.com/EmirhanSarac/discord-v14-muzik-botu - discord.gg/codare - youtube.com/EmirhanSarac