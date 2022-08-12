const chalk = require("chalk");

module.exports = client => {
    console.log(chalk.yellow(`[${client.user.username}] || Yeniden bağlanıyor ${new Date()}.`))
}

// github.com/EmirhanSarac/discord-v14-muzik-botu - discord.gg/codare - youtube.com/EmirhanSarac