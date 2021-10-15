import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
var XMLHttpRequest = require('xhr2');

export default {
    category:'Testing',
    description:'Very Bad Meme',
    callback:async({message})=>{
        const embed = new MessageEmbed()
            .setTitle('Generating Meme')
        const Message = await message.channel.send({
            embeds:[embed]
        })

        const req = new XMLHttpRequest();
        req.addEventListener('readystatechange', async()=>{
            if (req.readyState === 4 && req.status === 200){
                const response = req.responseText
                const data = JSON.parse(response);
                const editedEmbed  = Message.embeds[0];
                editedEmbed
                    .setTitle(data['caption'])
                    .setDescription(`category : ${data['category']}`)
                    .setColor('RANDOM')
                    .setImage(data['image'])
                await Message.edit({
                    embeds:[editedEmbed]
                })
            }
        });
        
        req.open('GET',`https://some-random-api.ml/meme`);
        req.send();
    }
} as ICommand