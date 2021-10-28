import { ICommand } from "wokcommands";

export default {
    category: 'Testing',
    description: 'Simulate a member join a guild',
    slash: 'both',
    permissions: ['ADMINISTRATOR'],
    testOnly: true,
    callback : ({ member, client })=>{
        client.emit('guildMemberAdd', member);
        return 'Join Simulated'
    }
} as ICommand;