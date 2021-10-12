import DiscordJS, { Intents } from 'discord.js';
import dotenv from 'dotenv';
import WOKcommands from 'wokcommands';
import path from 'path';

dotenv.config();

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

client.on('ready', () => {
    new WOKcommands(client, {
        commandDir: path.join(__dirname, 'commands'),
        testServers:['896753766731223040'],
    })
    console.log('The bot is now online');
});

client.login(process.env.TOKEN);