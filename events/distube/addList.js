const { EmbedBuilder } = require("discord.js");

module.exports = async (client, queue, playlist) => {
    const embed = new EmbedBuilder()
        .setDescription(`**Şarkı kuyruğa eklendi • [${playlist.name}](${playlist.url})** \`${queue.formattedDuration}\` (${playlist.songs.length} tracks) • ${playlist.user}`)
        .setColor('#000001')
  
      queue.textChannel.send({ embeds: [embed] })
}

// github.com/EmirhanSarac/discord-v14-muzik-botu - discord.gg/codare - youtube.com/EmirhanSarac