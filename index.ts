import DiscordJS, { Intents } from 'discord.js';
import dotenv from 'dotenv';
import WOKcommands from 'wokcommands';
import path from 'path';

dotenv.config();

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MEMBERS
    ]
});

client.on('ready', () => {
    new WOKcommands(client, {
        commandDir: path.join(__dirname, 'commands'),
        featureDir : path.join(__dirname, 'features'),
        testServers: [process.env.GUILD_ID!],
        typeScript: true,
        mongoUri: process.env.MONGO_URI
    })
        .setDefaultPrefix('.');
    console.log('The bot is now online');
});

client.login(process.env.TOKEN);