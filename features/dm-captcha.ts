import { Client, MessageAttachment, MessageEmbed, Message } from "discord.js";
import { Captcha} from "captcha-canvas";

export default (client:Client) => {
    client.on('guildMemberAdd', async member=>{
        const captcha = new Captcha(); 
        captcha.async = true
        captcha.addDecoy(); 
        captcha.drawTrace(); 
        captcha.drawCaptcha(); 

        const captchaAttachment = new MessageAttachment(
            await captcha.png, 'captcha.png'
        );

        const captchaEmbed = 
            new MessageEmbed()
                .setTitle(`Please Verify To Join ${member.guild.name} Server`)
                .setColor('DARK_PURPLE')
                .setImage('attachment://captcha.png')

        const message = await member.send({
            files : [captchaAttachment],
            embeds : [captchaEmbed],
        });
        
        const filter = (message:Message):boolean=>{
            if (message.author.id !== member.id){
                return false
            };
            if (message.content === captcha.text){
                return true;
            }
            else{
                message.channel.send('Wrong Captcha!');
                return false;
            }
        }

        try{
            const response = await message.channel.awaitMessages({
                filter,
                max :1,
                time : 120 * 1000,
                errors : ['time']
            });
            if (response){
                member.roles.add('911550317735337994');
                member.send('You are now Verified! Continue to <#897876575696085052>')
            }
        }
        catch(err){
            await member.send('You Are Not Verified! You failed to solve the captcha!');
        }
    })
}

export const config = {
    displayName : 'dm captcha',
    dbName : 'DM_CAPTCHA'
}