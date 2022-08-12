const { PermissionsBitField } = require("discord.js");

module.exports = {
    config: {
        name: "play",
        aliases: ["pplay", "p", "çal", "oynat"],
        description: "Belirttiğiniz şarkıyı sizin için çalar.",
        kategori: "muzik"

    },
    run: async (client, message, args) => {
  
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send("Ses kanalına girmeniz gerekmektedir.")
        if (!message.guild.members.cache.get(client.user.id).permissionsIn(channel).has(PermissionsBitField.Flags.Connect)) return message.channel.send(` ${channel.name} Bu kanala Bağlanma İznim Bulunmuyor!`);
        if (!message.guild.members.cache.get(client.user.id).permissionsIn(channel).has(PermissionsBitField.Flags.Speak)) return message.channel.send(` ${channel.name} Bu kanalda konuşma iznim bulunmuyor!`);

        const string = args.join(" ");
        if (!string) {
            return message.channel.send("Lütfen bir şarkı adı veya bağlantı giriniz.");
        }

        const options = {
            member: message.member,
            textChannel: message.channel,
            message
        }

        await client.distube.play(message.member.voice.channel, string, options);
    }
}


// github.com/EmirhanSarac/discord-v14-muzik-botu - discord.gg/codare - youtube.com/EmirhanSarac