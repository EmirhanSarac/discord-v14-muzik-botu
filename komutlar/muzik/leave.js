const { EmbedBuilder } = require("discord.js");

module.exports = {
    config: {
        name: "leave",
        aliases: ["lev", "stop", "dc", "ayrıl"],
        description: "Bot kanaldan ayrılır.",
        kategori: "muzik"

    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("Yükleniyor Lütfen Bekleyin");
        const queue = client.distube.getQueue(message);
        
		if (!queue) return msg.edit(`Şu anda kuyrukta hiçbir şarkı yok.!`)
        const clientVoice = message.guild.members.me.voice.channel;
        const memberVoice = message.member.voice.channel;

        if (clientVoice === memberVoice) {
            if (queue) {
                client.distube.stop(message);
                client.distube.voices.leave(message.guild);
            } else {
                client.distube.voices.leave(message.guild);
            }

            const embed = new EmbedBuilder()
                .setDescription(`\`🚫\` | **Başarıyla:** | \`${memberVoice.name}\` **Kanalından Ayrıldım!**`)
                .setColor('#000001')

            msg.edit({ content: ' ', embeds : [embed] });

        }

    }
}
