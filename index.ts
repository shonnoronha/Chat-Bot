import DiscordJS, { Intents } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

client.on('ready', () => {
    console.log('The bot is now online');
    const guilId = '896753766731223040';
    const guild = client.guilds.cache.get(guilId);
    let commands;
    if (guild) {
        commands = guild.commands;
    } else {
        commands = client.application?.commands;
    }

    commands?.create({
        name: 'ping',
        description: 'Replies with pong.',
    })

    commands?.create({
        'name': 'add',
        'description': 'add two numbers',
        'options': [
            {
            name: 'num1',
            description: 'The first number.',
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
            required: true
            },
            {
                name: 'num2',
                description: 'The second number.',
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
                required: true
            }
        ],
    })
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) {
        return
    }
    const { commandName, options } = interaction;

    if (commandName === 'ping') {
        interaction.reply({
            content: 'pong',
            ephemeral: true,
        })
    }else if (commandName === 'add'){
        const num1 = options.getNumber('num1')!;
        const num2 = options.getNumber('num2')!;

        // by default 3 seconds to reply 
        // can overcome by using `deferReply`
        await interaction.deferReply({
            ephemeral:true,
        })
        // simulating a 5 second wait
        await new Promise(resolve=> setTimeout(resolve, 5000));

        await interaction.editReply({
            content:`The answer is ${num1+num2}`,
        })
    }
})

// client.on('messageCreate', (message)=>{
//     if (message.content === 'ping'){
//         message.reply(
//             {content:'pong!!!'}
//         )
//     }
// });

client.login(process.env.TOKEN);