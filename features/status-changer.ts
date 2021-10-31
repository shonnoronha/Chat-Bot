import { Client } from "discord.js";

export default (client: Client) => {
    const x = client.guilds.cache.get(process.env.GUILD_ID!)?.memberCount;
    const a = `Serving ${client.guilds.cache.size} servers`;
    const b = `${x} members in this server`;
    const statusOptions = [a, b, '.help'];
    let counter = 0;
    const updateStatus = () => {
        client.user?.setPresence({
            activities: [{
                name: statusOptions[counter],
            }], 
            status: 'dnd',
        });
        if (++counter >= statusOptions.length) counter = 0;
        setTimeout(updateStatus, 30 * 1000);
    }
    updateStatus();
};

export const config = {
    dbName: 'STATUS_CHANGER',
    displayName: 'Status Changer'
}