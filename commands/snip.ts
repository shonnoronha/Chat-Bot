import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import { msgData } from "../features/msg-delete";

export default {
    category : 'Testing',
    description : 'Snip a message',
    testOnly : true, 
    callback : ({ channel })=>{
        const data = msgData[channel.id];
        if (!data) return 'Nothing to snip in this channel!';
        const embed = new MessageEmbed()
                        .setAuthor(data.author)
                        .setFooter(`#${channel.name}`)
                        .setColor('DARK_PURPLE')
                        .setTimestamp(data.createdAt)
                        .setDescription(data.content);
        data.image ? embed.setImage(data.image) : null;
        channel.send({
            embeds : [embed]
        });
    }
} as ICommand;