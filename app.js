const util = require("util");
const exec = util.promisify(require("child_process").exec);

async function runSpeedTest(){
    try{
        let {stdout, stderr} = await exec("speedtest");
        
        let ping = stdout.match(/(?<=Latency:)(.*)(?=\(jitter)/gm)[0];
        ping = ping.trim();

        let download_speed = stdout.match(/(?<=Download:)(.*)(?=\(data)/gm)[0];
        download_speed = download_speed.trim();
        
        let upload_speed = stdout.match(/(?<=Upload:)(.*)(?=\(data)/gm)[0];
        upload_speed = upload_speed.trim();

        return [download_speed, upload_speed, ping];

    }catch(e){
        console.log(e);
    }
}

(async ()=>{
    let inet = await runSpeedTest();
    console.log(inet);
})();

