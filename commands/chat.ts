import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import dotenv from 'dotenv';
var XMLHttpRequest = require('xhr2');

dotenv.config({path:'./.env'});

export default {
    category:'Testing',
    description:'Very Bad Meme',
    minArgs:1,
    expectedArgs:'<your message>',
    callback:async({message,text})=>{
        const embed = new MessageEmbed()
            .setTitle('Sending Message')
        const Message = await message.reply({
            embeds:[embed]
        })

        const req = new XMLHttpRequest();
        req.addEventListener('readystatechange', async()=>{
            if (req.readyState === 4 && req.status === 200){
                const response = req.responseText
                const data = JSON.parse(response);
                const editedEmbed  = Message.embeds[0];
                editedEmbed
                    .setTitle('JOKE')
                    .setDescription(data['response'])
                await Message.edit({
                    embeds:[editedEmbed]
                })
                
            }
        });
        const msg = encodeURIComponent(text);
        const key = process.env.SRA_KEY;
        
        req.open('GET',`https://some-random-api.ml/chatbot?message=${msg}&key=${key}`);
        req.send();
    }
} as ICommand