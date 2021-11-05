import { Client, GuildMember, MessageActionRow, MessageSelectMenu, MessageSelectOptionData, Role, TextChannel } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category : 'Configuration',
    description : 'Add A Role',
    permissions : ['ADMINISTRATOR'],
    minArgs : 3, 
    maxArgs : 3,
    expectedArgs : '<channel> <messageID> <role>',
    expectedArgsTypes : ['CHANNEL', 'STRING', 'ROLE'],
    slash : 'both',
    testOnly : true,

    init: (client:Client)=>{
        client.on('interactionCreate', interaction=>{

            if (!interaction.isSelectMenu()) return;

            const {customId, member, values} = interaction;

            if (customId === 'auto_roles' && member instanceof GuildMember){
                const component = interaction.component as MessageSelectMenu
                const removed = component.options.filter(option=>{
                    return !values.includes(option.value)
                })

                if (!(interaction.member?.user.id === interaction.guild?.ownerId)){
                    // bot cannot remove role of the owner
                    for (const id of removed){
                        member.roles.remove(id.value)
                    }
                }

                for (const id of values){
                    member.roles.add(id)
                }

                interaction.reply({
                    ephemeral : true,
                    content : 'Roles Updated!'
                })
            }
        })
    },
    
    callback : async ({message, interaction, args, client})=>{
        const channel = (message ? message.mentions.channels.first() : 
                    interaction.options.getChannel('channel')) as TextChannel;

        if (!channel || channel.type !== 'GUILD_TEXT') return '🙏Please Enter a Text Channel!';

        const msgId = args[1];
        const role = (message ? message.mentions.roles.first() : 
                    interaction.options.getRole('role')) as Role;

        if (!role) return 'Unknown Role!🤔';

        const targetMessage = await channel.messages.fetch(msgId, {
            cache : true, 
            force : true
        });

        if (!targetMessage) return '😵 Unknown Message ID';

        if (targetMessage.author.id !== client.user?.id){
            return `🙏Please provide a ID to the message sent by <@&${client.user?.id}>`;
        };

        let row = targetMessage.components[0] as MessageActionRow;
        if (!row){
            row = new MessageActionRow()
        };

        const option : MessageSelectOptionData[] = [{
            label : role.name,
            value : role.id
        }];

        let menu = row.components[0] as MessageSelectMenu;

        if (menu){
            for (const o of menu.options){
                if (o.value === option[0].value){
                    return {
                        custom : true,
                        content : `<@${o.value}> is already part of the menu`,
                        allowedMentions: {
                            roles: []
                        },
                        ephemeral : true,
                    }
                }
            }
            menu.addOptions(option);
            menu.setMaxValues(menu.options.length);
        }
        else {
            row.addComponents(
                new MessageSelectMenu()
                    .setCustomId('auto_roles')
                    .setMinValues(0)
                    .setMinValues(1)
                    .setOptions(option)
                    .setPlaceholder('SELECT YOUR ROLES')
            )
        };

        targetMessage.edit({
            components : [row]
        });

        return {
            custom : true,
            content : `Added <@&${role.id}>`,
            allowedMentions : {
                roles : []
            },
            ephemeral : true,
        };
    }
} as ICommand