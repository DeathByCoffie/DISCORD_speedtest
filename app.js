import 'dotenv/config';
import {
    InteractionType,
    InteractionResponseType,
    InteractionResponseFlags,
    MessageComponentTypes,
    ButtonStyleTypes,
  } from 'discord-interactions';
import { VerifyDiscordRequest, getRandomEmoji, DiscordRequest } from './utils.js';

import {promisify} from "util";
import child_process from "child_process";

const exec = promisify(child_process.exec);

import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));

app.post('/interactions', async (req, res)=>{
    const {type, id, data} = req.body;
    // Handle verification requests
    if (type === InteractionType.PING)
    {
        return res.send({type: InteractionResponseType.PONG});
    }
    // Handle slash commands
    if (type === InteractionType.APPLICATION_COMMAND)
    {
        const {name} = data;
        // test command
        if(name === 'test')
        {
            return res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data:{
                    content: "Hello World " + getRandomEmoji()
                }
            });
        }

        if(name === 'speedtest')
        {
            try{
                console.log("Starting speedtest");
                let {stdout, stderr} = await exec("speedtest");
                
                let ping = stdout.match(/(?<=Latency:)(.*)(?=\(jitter)/gm)[0];
                ping = ping.trim();
        
                let download_speed = stdout.match(/(?<=Download:)(.*)(?=\(data)/gm)[0];
                download_speed = download_speed.trim();
                
                let upload_speed = stdout.match(/(?<=Upload:)(.*)(?=\(data)/gm)[0];
                upload_speed = upload_speed.trim();
        
                // return [download_speed, upload_speed, ping];
                return res.send({
                    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                    data:{
                        content: `DOWNLOAD: ${download_speed} | UPLOAD: ${upload_speed} | PING: ${ping}`
                    }
                })
    
            }catch(e){
                console.log(e);
            }
        }
    }
});

app.listen(PORT, () =>{
    console.log('Listening on port', PORT);
})






