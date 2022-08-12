const { readdirSync } = require("fs")
const delay = require('delay');
const chalk = require("chalk");

module.exports = async (client) => {
    const load = dirs => {
        const commands = readdirSync(`./komutlar/${dirs}/`).filter(d => d.endsWith('.js'));
        for (let file of commands) {
            let pull = require(`../komutlar/${dirs}/${file}`);
            client.commands.set(pull.config.name, pull);
            if (pull.config.aliases) pull.config.aliases.forEach(a => client.aliases.set(a, pull.config.name));
          };
        };
        ["muzik", "filtre", "diger"].forEach(x => load(x));
        await delay(4000);
        console.log(chalk.greenBright(`[BİLGİ] Komut Dosyaları Yüklendi!`));
};

// github.com/EmirhanSarac/discord-v14-muzik-botu - discord.gg/codare - youtube.com/EmirhanSarac