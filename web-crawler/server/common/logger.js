var log4js = require("log4js");
var fs = require('fs');
log4js.configure({
    appenders:{
        stdout:{
          type:'stdout'
        },
        info:{
            type: 'dateFile',
            absolute: true,
            filename: __dirname + '/../logs/access.log',
            maxLogSize: 1024 * 1024,
            backup: 3,
            compress: true
        },
        error:{
            type: 'dateFile',
            absolute: true,
            filename: __dirname + '/../logs/error.log',
            maxLogSize: 1024 * 1024,
            backup: 3,
            compress: true

        },
        crawler:{
            type: 'dateFile',
            absolute: true,
            filename: __dirname + '/../logs/web-crawler.log',
            maxLogSize: 1024 * 1024,
            backup: 3,
            compress: true
        }
    },
    categories: {
        default: { appenders: [ 'info'], level: 'debug' },
        crawler:{ appenders: ['crawler' ], level: 'debug' },
        error: { appenders: ['error'], level: 'error' },
        consoleError:{appenders:['stdout'],level:'ERROR'}
    }
});

exports.getLogger = function(name,type){
    const logger  = log4js.getLogger(name);
    logger.level = 'info';
    return logger;
}

// var  confirmParth = function(pathStr){
//     if(!fs.existsSync(pathStr)){
//         fs.mkdirSync(pathStr);
//     }
// }

