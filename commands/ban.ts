import { MessageActionRow, MessageButton } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: "Testing",
    description: "Bans a mentioned User",
    requiredPermissions: ['ADMINISTRATOR'],
    expectedArgsTypes:['MENTIONABLE'],
    minArgs:1,
    testOnly: true,
    expectedArgs:'user',
    slash: true,
    options: [{
        name: 'user',
        description: 'user',
        type: 'MENTIONABLE',
        required:true,
    }],
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
        
        msgInt.reply({
            content:`Confirm ban on <@${msgInt.options.get('user')?.user?.id}>`,
            components:[row],
        });
        
        const filter = (btnInt:{user:{id:string}})=>{
            return msgInt.user.id === btnInt.user.id 
        }

        const collector = channel.createMessageComponentCollector({
            filter,
            max:1,
            time: 15 * 1000
        });

        collector.on('end', async collection=>{
            const responder = collection.first();
            if (responder?.customId === 'BAN'){
                // TODO : implement ban
                await msgInt.editReply({
                    content:`BANNED ${msgInt.options.get('user')?.user?.username}`,
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