import { ICommand } from "wokcommands";

export default {
    category : 'Moderation',
    description : 'clear multiple messages at once',
    permissions : ['ADMINISTRATOR'],
    minArgs: 1,
    expectedArgs : '[amount]',
    slash : 'both',
    testOnly : true,
    callback : async({message, interaction, channel, args}) =>{

        const amount = args.length ? parseInt(args.shift()!) : 10 ;

        if (message){
            await message.delete()
        };

        const { size } = await channel.bulkDelete(amount, true);

        // const messages = await channel.messages.fetch({ limit:amount });
        // const { size } = messages;
        // messages.forEach(message=>message.delete());

        const reply = `${size} message's were deleted!`;

        if (interaction){
            return reply;
        };

        channel.send(reply);
    }
} as ICommand