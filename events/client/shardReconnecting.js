const chalk = require("chalk");

module.exports = (client, id) => {
    console.log(chalk.yellowBright(`[${String(new Date).split(" ", 5).join(" ")}] || ==> || Shard #${id} Yeniden Bağlanıyor`))
}

// github.com/EmirhanSarac/discord-v14-muzik-botu - discord.gg/codare - youtube.com/EmirhanSarac