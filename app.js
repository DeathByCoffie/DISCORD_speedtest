const {exec} = require("child_process");
exec("speedtest", (error, stdout, stderr) =>{
    if(error){
        console.log(`error: ${stderr.message}`);
        return;
    }
    if(stderr){
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
})