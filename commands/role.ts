import { ICommand } from "wokcommands";

const actions = ['give', 'remove', 'has'];

export default {
    category : 'Moderation',
    description : 'Check role status',
    permissions : ['MANAGE_ROLES'],
    minArgs : 3,
    expectedArgs : `<${actions.join('", "')}> <user @> <role @>`,
    slash : 'both',
    testOnly : true,
    guildOnly : true,
    options : [{
        name : 'action',
        description : `The action to perform. One of ${actions.join('", "')}`,
        type : 'STRING',
        required : true,
        choices : actions.map(action=>({
            name : action,
            value : action
        })),
    },
    {
        name : 'user',
        description : 'The user to perform the action on',
        type : "USER",
        required : true
    },
    {
        name : 'role',
        description : 'The role to perform the action on',
        type : 'ROLE',
        required : true
    },
    ],

    callback: ({ guild, args }) =>{
        const action = args.shift();

        if (!action || !actions.includes(action)){
            return `Unkonwn action! Please use one of the following ${actions.join('", "')}`
        };

        const memberId = args.shift()!.replace(/[<@!&>]/g, '');
        const roleID = args.shift()!.replace(/[<@!&>]/g, '');

        const member = guild?.members.cache.get(memberId);
        const role = guild?.roles.cache.get(roleID);

        if (!member){
            return `Could not find member with the id ${memberId}`;
        };

        if (!role){
            return `Could not find role with the id ${roleID}`;
        }

        if (action === 'has'){
            return member.roles.cache.has(roleID) ? 'User has role' :  'User doesn\'t have role';
        };

        if (action === 'give'){
            member.roles.add(role);
            return 'role given';
        };

        if (action === 'remove'){
            member.roles.remove(role);
            return 'Role Removed';
        }

        return 'Unknown action!';
    }
} as ICommand