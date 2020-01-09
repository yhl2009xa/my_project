/**************************nodejs的定时任务***************************/
const controller = require('./crawler/controller');
const schedule = require('node-schedule');


//虎扑定时器
const  scheduleHPCronstyle = ()=>{
    schedule.scheduleJob('0 0 12,22 * * *',()=>{
        controller.init();
    });

}

scheduleHPCronstyle();

