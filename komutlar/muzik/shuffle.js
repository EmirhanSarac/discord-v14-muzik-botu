const { EmbedBuilder } = require('discord.js');

module.exports = { 
    config: {
        name: "shuffle",
        aliases: ["mix"],
        description: "Geçerli kuyruğu karıştırır.",
        kategori: "muzik"
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("Yükleniyor lütfen bekleyin...");

        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`Şu anda kuyrukta hiçbir şey yok.!`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit("Aynı / sesli kanalda olmanız gerekmektedir.")

            await client.distube.shuffle(message);

			let embed = new EmbedBuilder()
				.setColor('#000001')
				.setDescription(`\`🔀\` | **Kuyruk başarıyla karıştırıldı!**`);

			msg.edit({ content: ' ', embeds: [embed] });
    }
};