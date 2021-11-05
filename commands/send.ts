import { TextChannel } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category : 'Testing',
    description: 'Sends a Message!',
    permissions : ['ADMINISTRATOR'],
    minArgs : 2,
    expectedArgs : '<channel> <message>',
    slash : 'both',
    expectedArgsTypes : ['CHANNEL', 'STRING'],
    testOnly : true,
    
    callback : ({ message, interaction, args }) =>{
        const channel = (message ? message.mentions.channels.first() : 
                    interaction.options.getChannel('channel')) as TextChannel;
        if (!channel || channel.type !== 'GUILD_TEXT') return '🙏Please Enter a Text Channel!';
        args.shift();
        const text = args.join(' ');
        channel.send(text);
        if (interaction){
            interaction.reply({
                content: '✅Send Message',
                ephemeral : true
            });
        };
    }
} as ICommand