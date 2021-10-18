import { Message, MessageReaction, User } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Testing',
    description: 'Collector',
    callback: ({ message, channel }) => {
        message.reply('Please confirm : ')
        message.react('👍🏿')
        message.react('👎🏿');

        // const filter = (msg: Message) => {
        //     return msg.author.id === message.author.id
        // }

        // const collector = channel.createMessageCollector({
        //     filter,
        //     max: 1,
        //     time: 5 * 1000
        // })

        const filter = (reaction: MessageReaction, user: User) => {
            return user.id === message.author.id
        }

        const collector = message.createReactionCollector({
            filter,
            max: 1,
            time: 5 * 1000,
        })

        collector.on('collect', (reaction) => {
            console.log(reaction.emoji.name);
        })

        collector.on('end', (collected) => {
            if (collected.size === 0) {
                message.reply('You did not react to the message');
                return
            };
            let text = 'Collected:\n';
            collected.forEach((message) => {
                text += `${message.emoji.name}\n`
            })
            message.channel.send(text);
        })
    }
} as ICommand