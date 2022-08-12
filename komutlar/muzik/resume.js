const { EmbedBuilder } = require("discord.js");

module.exports = {
    config: {
        name: "resume",
        aliases: ["re", "devamet", "devam-et"],
        description: "Şarkıyı devam ettirir.",
        kategori: "muzik"

    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("Yükleniyor Lütfen Bekleyin");

        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`Şu anda kuyrukta hiçbir şey yok.!`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit("Aynı / sesli kanalda olmanız gerekmektedir.")
		
		if (queue.paused) { 
			await client.distube.resume(message);

			const embed = new EmbedBuilder()
				.setColor("#000001")
				.setDescription(`\`⏯\` | **Şarkı başarıyla devam etmektedir**`);

			msg.edit({ embeds: [embed] });
		} else {
			const embed = new EmbedBuilder()
				.setColor("#000001")
				.setDescription(`\`⏯\` | **Kuyruk başarıyla devam ediyor**`);

			msg.edit({ embeds: [embed] });
		}
    }
}
