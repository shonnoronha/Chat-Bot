import { ICommand } from "wokcommands";

export default {
    category: 'Testing',
    description: 'adds two numbers',
    aliases: 'sum',
    slash: 'both',
    options: [
        {
            name: 'number1',
            description: 'First number',
            type: 'NUMBER',
            required: true
        },
        {
            name: 'number2',
            description: 'Second number',
            type: 'NUMBER',
            required: true
        }
    ],
    testOnly: true,
    callback: ({ args, prefix, message }) => {
        if (prefix) {
            message.channel.send(`sum is ${parseInt(args[0]) + parseInt(args[1])}`)
        } else {
            return `sum is ${parseInt(args[0]) + parseInt(args[1])}`
        }
    }
} as ICommand