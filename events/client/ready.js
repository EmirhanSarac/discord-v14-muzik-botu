const figlet = require('figlet');
const chalk = require('chalk');
// github.com/EmirhanSarac/discord-v14-muzik-botu - discord.gg/codare - youtube.com/EmirhanSarac
module.exports = async (client) => {
  figlet(client.user.tag, function(err, data) {
    if (err) {
        console.log('hata var kontrol edin (ready)');
        console.dir(err);
        return;
    }
    console.log(chalk.red.bold(data));
  });

  let guilds = client.guilds.cache.size;
  let users = client.users.cache.size;
  let channels = client.channels.cache.size;

  const activities = [
      `${client.prefix}`,
      `${client.prefix}`,
      `${client.prefix}`,
  ]

  setInterval(() => {
      client.user.setActivity(`${activities[Math.floor(Math.random() * activities.length)]}`, { type: 'WATCHING' });
  }, 15000)
}


// github.com/EmirhanSarac/discord-v14-muzik-botu - discord.gg/codare - youtube.com/EmirhanSarac