import { MessageEmbed, MessageMentions } from "discord.js";
import { ICommand } from "wokcommands";

export default { 
    category:"Testing",
    description:"sends an embed",
    permissions:['ADMINISTRATOR'],
    minArgs:1,
    expectedArgs: '@target',
    expectedArgsTypes: ['MENTIONABLE'],
    callback: ({ message }) =>{
        message.react('👍');
        message.delete();
        const target = message.mentions.members?.first()
        const embed = new MessageEmbed()
                .setDescription(`info about ${target?.user.username}`)
                .setTitle("INFO")
                .setColor("PURPLE")
                .setTimestamp(Date.now())
                .setThumbnail(target?.user.displayAvatarURL()!)
                .setFooter(`requested by ${message.author.username}`)
                .addFields([
                    {
                    name:'JOINED DISCORD ON',
                    value:`${target?.user.createdAt.getDate()}-${target?.user.createdAt.getMonth()}-${target?.user.createdAt.getFullYear()}`,
                    },
                    {
                        name:'ID',
                        value:`${target?.user.id}`
                    },
                    {
                        name:'DISPLAY COLOR',
                        value:`${target?.displayHexColor}`,
                        inline:true
                    },
                    {
                        name:'BANNABLE',
                        value:`${target?.bannable}`,
                        inline:true
                    },
                    {
                        name:'JOINED ON',
                        value:`${target?.joinedAt}`
                    }
            ])
        message.channel.send({
            embeds: [embed]
        })
    }
} as ICommand