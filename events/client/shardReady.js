const chalk = require("chalk");
const delay = require("delay");

module.exports = async (client, id) => { 
    await delay(2000); 
    console.log(chalk.greenBright(`[${String(new Date).split(" ", 5).join(" ")}] || ==> || Shard #${id} Hazır`))
}

// github.com/EmirhanSarac/discord-v14-muzik-botu - discord.gg/codare - youtube.com/EmirhanSarac