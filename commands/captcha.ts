import { ICommand } from "wokcommands";
import { Captcha } from 'captcha-canvas';
import { Message, MessageAttachment } from "discord.js";

export default {
    category : 'Testing',
    description : 'Add Captcha',

    callback: async({ message,channel })=>{
    const captcha = new Captcha(); 
    captcha.async = true
    captcha.addDecoy(); 
    captcha.drawTrace(); 
    captcha.drawCaptcha(); 

    const captchaAttachment = new MessageAttachment(await captcha.png, 'captcha.png');

    message.channel.send({
        content: 'You Have 10 Seconds to solve the captcha!',
        files : [captchaAttachment]
    });
    
    const filter = (msg : Message) => {
        return msg.author.id === message.author.id;
    };

    const collector = channel.createMessageCollector({
        filter,
        max : 1,
        time : 10 * 1000
    });

    collector.on('end', collected=>{
        if (collected.size === 0){
            message.channel.send('You did not solve your captcha in time!');
            return
        }
        const userAnswer = collected.first()!;
        if (userAnswer.content === captcha.text){
            userAnswer.reply('Congrats You Have Solved The Captcha! You are a Human!!');
        }
        else{
            userAnswer.reply('Wrong Captcha Solution! Please Try Again!');
        }
    });
    
    }
} as ICommand