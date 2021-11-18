import axios from 'axios';
import { ICommand } from 'wokcommands';


export default {
    category : 'API',
    description : 'example for a GET api request',

    maxArgs : 1,
    expectedArgs : '<id>',
    expectedArgsTypes : ['NUMBER'],

    slash : 'both',
    testOnly : true,

    callback : async ({ args })=>{
        let uri = 'https://jsonplaceholder.typicode.com/posts';

        if (args.length){
            uri += `/${args[0]}`
        }

        const data = await axios.get(uri);
        console.log(data.data);
    },
} as ICommand;