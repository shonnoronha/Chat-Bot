import { GuildMember } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category : 'Moderation',
    description : 'Kicks A User',
    // permissions :['ADMINISTRATOR'],
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
        if (!target) return 'Please Mention Someone To Kick! 😑';
        if (!target.kickable) return 'You cannot kick This User ☹';
        args.shift();
        const reason = args.join(' ');
        target.kick(reason);
        return `You Kicked <@${target.id}> Successfully!`
    }
} as ICommand