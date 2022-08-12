module.exports = async (client, oldState, newState) => {
    if (
        (!oldState.streaming && newState.streaming)   ||
        (oldState.streaming && !newState.streaming)   ||
        (!oldState.serverDeaf && newState.serverDeaf) ||
        (oldState.serverDeaf && !newState.serverDeaf) ||
        (!oldState.serverMute && newState.serverMute) ||
        (oldState.serverMute && !newState.serverMute) || 
        (!oldState.selfDeaf && newState.selfDeaf)     ||
        (oldState.selfDeaf && !newState.selfDeaf)     ||
        (!oldState.selfMute && newState.selfMute)     ||
        (oldState.selfMute && !newState.selfMute)     ||
        (!oldState.selfVideo && newState.selfVideo)   ||
        (oldState.selfVideo && !newState.selfVideo) 
     )
    if (!oldState.channelId && newState.channelId) {
        if(newState.channel.type == "GUILD_STAGE_VOICE" && newState.guild.members.me.voice.suppress){
          try{
            await newState.guild.members.me.voice.setSuppressed(false);
          }catch (e){
            console.log(String(e).grey)
          }
        }
        return
    }

    // github.com/EmirhanSarac/discord-v14-muzik-botu - discord.gg/codare - youtube.com/EmirhanSarac
    if (oldState.channelId && !newState.channelId) {
        return
    }
    if (oldState.channelId && newState.channelId) {
        if(newState.channel.type == "GUILD_STAGE_VOICE" && newState.guild.members.me.voice.suppress){
          try{
            await newState.guild.members.me.voice.setSuppressed(false);
          }catch (e){
            console.log(String(e).grey)
          }
        }
        return;
    }
}