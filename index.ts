import DiscordJS, { Intents } from 'discord.js';
import dotenv from 'dotenv';
import WOKcommands from 'wokcommands';
import path from 'path';

dotenv.config();

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ],
    partials: ["MESSAGE", "REACTION", "USER"],
});

client.on('ready', () => {
    new WOKcommands(client, {
        commandDir: path.join(__dirname, 'commands'),
        testServers: ['896753766731223040'],
        typeScript: true,
    })
        .setDefaultPrefix('.');
    console.log('The bot is now online');
    console.log(`[sniper] :: Logged in as ${client!.user!.tag}.`);
});

client.login(process.env.TOKEN);