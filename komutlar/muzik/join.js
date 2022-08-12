const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
    config: {
        name: "join",
        aliases: ["katıl"],
        description: "Bot ses kanalına katılır.",
		kategori: "muzik"

    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("Yükleniyor Lütfen Bekleyin");

		const { channel } = message.member.voice;
        if (!message.guild.members.cache.get(client.user.id).permissionsIn(channel).has(PermissionsBitField.Flags.Connect)) return message.channel.send(` ${channel.name} Bu kanala Bağlanma İznim Bulunmuyor!`);
        if (!message.guild.members.cache.get(client.user.id).permissionsIn(channel).has(PermissionsBitField.Flags.Speak)) return message.channel.send(` ${channel.name} Bu kanalda konuşma iznim bulunmuyor!`);

        const clientVoice = message.guild.members.me.voice.channel;
        const memberVoice = message.member.voice.channel;
		
		if (clientVoice) {
			if (clientVoice !== memberVoice) {
				const embed = new EmbedBuilder()
					.setColor("#000001")
					.setDescription(`${message.client.user} Bir kanalda bulunmanız gerekmektedir.`);

				return msg.edit({ content: ' ', embeds: [embed] });
			} else {
				const embed = new EmbedBuilder()
					.setColor("#000001")
					.setDescription(`Zaten ses kanalındayım!`);

				return msg.edit({ content: ' ', embeds: [embed] });
			}
		} else {
			if (memberVoice) {
				client.distube.voices.join(memberVoice)
					.then(voice => {
						const embed = new EmbedBuilder()
							.setColor('#000001')
							.setDescription(`\`🔊\` | **Başarıyla** \`${memberVoice.name}\` **Kanalına Katıldım!**`)

                        msg.edit({ content: ' ', embeds: [embed] });
					})
					.catch(error => {
						console.log(e);
					})

				
			} else {
				const embed = new EmbedBuilder()
					.setColor("#000001")
					.setDescription(`Bir ses kanalında olmalısınız.`);

				return msg.edit({ content: ' ', embeds: [embed] });
			}
		}
    }
}
