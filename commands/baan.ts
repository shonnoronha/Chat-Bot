import {  GuildMember } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category : 'Moderation',
    description : 'Bans A User',
    requireRoles : true,
    slash : 'both',
    testOnly : true,
    guildOnly : true,
    minArgs : 2,
    expectedArgs : '<user> <reason>',
    expectedArgsTypes : ['USER', 'STRING'],
    callback : ({ message, interaction, args })=>{
        const target = message ? message.mentions.members?.first() :
         interaction.options.getMember('user') as GuildMember;
        if (!target) return 'Please Mention Someone To Ban! 😑';
        if (!target.bannable) return 'You cannot Ban This User ☹';
        args.shift();
        const reason = args.join(' ');
        target.ban({
            reason,
            days : 7
        });
        return `You Banned <@${target.id}> Successfully!`
    }
} as ICommand