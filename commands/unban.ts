import { ICommand } from "wokcommands";

export default {
    category : 'Administration',
    description : 'Unban a User',
    requiredPermissions : ['ADMINISTRATOR'],
    minArgs : 1,
    expectedArgs : '<id>',
    expectedArgsTypes : ['USER'],
    callback : async({ text, message})=>{
        let bannedList:any;
        let unban = false;
        await message.guild?.bans.fetch().then(data=>{
            bannedList = data;
        });
        bannedList.forEach((bannedUser: any) => {
            if (bannedUser.user.id===text){
                message.guild?.members.unban(text);
                unban = true;
                message.reply('Unban Successful!');
            }
        })
        if (!unban) message.reply('Did not find a match to Unban!');
    }
} as ICommand