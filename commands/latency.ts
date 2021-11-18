import { ICommand } from "wokcommands";

export default {
    category : 'Testing',
    description : 'Gives latency for bot and api',
    callback : ({ message,client }) =>{
        message.channel.send('calculating ping...')
            .then(rmessage=>{
                const ping = rmessage.createdTimestamp - message.createdTimestamp;
                rmessage.edit(`Bot Ping = ${ping}ms Discord API ping = ${client.ws.ping}ms`)
            })
    }
} as ICommand