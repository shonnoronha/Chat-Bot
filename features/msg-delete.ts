import { Client } from "discord.js";

const msgData = {} as {
    [channelId: string]: {
        author: string,
        content: string,
        createdAt: number,
        image?: string | null
    }
}

export default (client: Client) => {
    client.on('messageDelete', message => {
        msgData[message.channel.id] = {
            author: message.author?.tag!,
            content: message.content!,
            createdAt: message.createdTimestamp,
            image: message.attachments.first() ?
                message.attachments.first()?.proxyURL : null
        };
    })
}

export { msgData }

export const config = {
    displayName : 'Snip Message',
    dbName : 'SNIP_MESSAGE'
}
