const chalk = require("chalk");

module.exports = (client, id, replayedEvents) => {
    console.log(chalk.yellow(`[${String(new Date).split(" ", 5).join(" ")}] || ==> || Shard #${id} Yeniden Baglandı!`))
}

// github.com/EmirhanSarac/discord-v14-muzik-botu - discord.gg/codare - youtube.com/EmirhanSarac