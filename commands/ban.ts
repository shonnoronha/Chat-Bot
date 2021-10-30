import { GuildMember, MessageActionRow, MessageButton } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: "Testing",
    description: "Bans a mentioned User",
    // requireRoles: true,
    requiredPermissions : ['ADMINISTRATOR'],
    minArgs:2,
    testOnly: true,
    expectedArgs:'<user> <reason>',
    slash: true,
    options: [
        {
            name: 'user',
            description: 'user to be banned',
            type: 'USER',
            required:true,
        },
        {
            name: 'reason',
            description: 'reason for the ban',
            type: 'STRING',
            required:true,
        },
],
    callback: async ({ interaction: msgInt, channel }) => {
        const row = new MessageActionRow() 
                        .addComponents(
                            new MessageButton()
                                .setEmoji('✅')
                                .setLabel('BAN')
                                .setStyle('SUCCESS')
                                .setCustomId('BAN')
                        )
                        .addComponents(
                            new MessageButton()
                                .setEmoji('❌')
                                .setLabel('NO')
                                .setStyle('DANGER')
                                .setCustomId('NO')
                        );
        
        const target = msgInt.options.getMember('user') as GuildMember;
        
        msgInt.reply({
            content:`Confirm ban on ${target.user.username}`,
            components:[row],
            ephemeral : true,
        });
        
        const filter = (btnInt:{user:{id:string}})=>{
            return msgInt.user.id === btnInt.user.id 
        }

        const collector = channel.createMessageComponentCollector({
            filter,
            max:1,
            time: 30 * 1000
        });

        collector.on('end', async collection=>{
            const responder = collection.first();
            if (responder?.customId === 'BAN'){
                if (!target.bannable){
                    msgInt.editReply({
                        content : `cannot ban ${target.user.username}`,
                        components : [],
                    });
                    return;
                }
                target.ban({
                    reason : msgInt.options.getString('reason')!,
                    days : 7
                });
                await msgInt.editReply({
                    content:`banned ${target.user.username}`,
                    components:[],
                });
                
            }else{
                await msgInt.editReply({
                    content:`BAN CANCELLED BY ${responder?.user.username}`,
                    components:[],
                });
            }
        });
    }
} as ICommand