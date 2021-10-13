import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
var XMLHttpRequest = require('xhr2');

export default {
    category:'Testing',
    'description': 'fact something',
    callback: async ({ message })=>{
        const embed = new MessageEmbed()
            .setTitle('some animal facts')
            .setDescription('Loading...')
        const Message = await message.channel.send({
            embeds:[embed]
        })

        const animals = ['dog', 'cat', 'panda', 'fox', 'red_panda',
                            'koala', 'birb', 'raccoon', 'kangaroo'];
        const choice =  animals[Math.floor(Math.random() * animals.length)];

        const req = new XMLHttpRequest();
        req.addEventListener('readystatechange', async()=>{
            if (req.readyState === 4 && req.status === 200){
                const response = req.responseText
                const data = JSON.parse(response);
                const editedEmbed  = Message.embeds[0];
                editedEmbed
                    .setTitle(`${choice.toLocaleUpperCase()} FACT`)
                    .setDescription(data['fact'])
                    .setColor('RANDOM')
                    .setImage(data['image'])
                Message.edit({
                    embeds:[editedEmbed]
                })
            }
        });
        
        req.open('GET',`https://some-random-api.ml/animal/${choice}`);
        req.send();
    }
} as ICommand