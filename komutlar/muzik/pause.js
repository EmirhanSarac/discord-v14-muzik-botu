const { EmbedBuilder } = require("discord.js");

module.exports = {
    config: {
        name: "pause",
        aliases: ["pa", "duraklat"],
        description: "Çalan şarkıyı duraklatır.",
        kategori: "muzik"

    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("Yükleniyor lütfen bekleyin!");

        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`Şu anda kuyrukta hiçbir şarkı yok.!`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit("Aynı / sesli kanalda olmanız gerekmektedir.")
		
		if (queue.paused) { 
			const embed = new EmbedBuilder()
				.setColor("#000001")
				.setDescription(`\`⏯\` | **Şarkı:** \`Duraklatıldı\``);

			msg.edit({ content: ' ', embeds: [embed] });
		} else {
			client.distube.pause(message);
			const embed = new EmbedBuilder()
				.setColor("#000001")
				.setDescription(`\`⏯\` | **Şarkı:** \`Duraklatıldı\``);

			msg.edit({ content: ' ', embeds: [embed] });
		}
    }
}
