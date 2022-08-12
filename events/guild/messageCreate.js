const { PermissionsBitField, EmbedBuilder } = require("discord.js");

module.exports = async (client, message) => { 
    if(message.author.bot || message.channel.type === "dm") return;

    const PREFIX = client.prefix;

    const mention = new RegExp(`^<@!?${client.user.id}>( |)$`);
    if (message.content.match(mention)) {
      const embed = new EmbedBuilder()
        .setColor("#000001")
        .setDescription(`**Ön Ekim: \`${PREFIX}\`**`);
      message.channel.send({ embeds: [embed] })
    };
    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(PREFIX)})\\s*`);
    if (!prefixRegex.test(message.content)) return;
    const [ matchedPrefix ] = message.content.match(prefixRegex);
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if(!command) return;
    
    if(!message.guild.members.me.permissions.has(PermissionsBitField.Flags.SendMessages)) return await message.author.dmChannel.send({ content: `I don't have perm  **\`SEND_MESSAGES\`** permission in <#${message.channelId}> to execute command!` }).catch(() => {});
    if(!message.guild.members.me.permissions.has(PermissionsBitField.Flags.EmbedLinks)) return await message.channel.send({ content: `I don't have perm **\`EMBED_LINKS\`** to execute command!` }).catch(() => {});
    
    console.log(`[KOMUT] ${command.config.name}, ${message.author.tag} Tarafından kullanıldı.`);

    try {
        command.run(client, message, args);
    } catch (error) {
        console.log(error);
        const embed = new EmbedBuilder()
            .setColor("#000001")
            .setDescription("Bu komut kullanılırken bir hata oluştu.");

        return message.channel.send({ embeds: [embed] });
    }
}

// github.com/EmirhanSarac/discord-v14-muzik-botu - discord.gg/codare - youtube.com/EmirhanSarac