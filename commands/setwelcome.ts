import { ICommand } from "wokcommands";
import welcomeSchema from "../models/welcome-schema";

export default {
    category : 'Configuration',
    description : 'Sets the welcome channel',
    permissions : ['ADMINISTRATOR'],
    minArgs : 2,
    expectedArgs: '<channel> <text>',
    slash : 'both',
    testOnly : true,
    options: [
        {
        type: 'CHANNEL',
        name : 'channel',
        description : 'the target channel',
        required : true
        },
        {
            type: 'STRING',
            name : 'text',
            description : 'The welcome message',
            required : true
        }
    ],
    callback : async ({ guild, message, interaction, args })=>{
        if (!guild) return 'Please Use This In a Server';
        const target = message ? message.mentions.channels.first() : interaction.options.getChannel('channel');
        if (!target || target.type !== 'GUILD_TEXT') return 'Please Tag a Text Channel';
        let text  = interaction?.options.getString('text');
        if (message){
            args.shift();
            text = args.join(' ');
        };
        await welcomeSchema.findOneAndUpdate(
            {
                _id: guild.id
            },
            {
                _id: guild.id,
                text,
                channelId: target.id
            },
            {
                upsert: true,
            }
            );
        return  'channel set'
    }
} as ICommand