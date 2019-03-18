var log4js = require("log4js");
var fs = require('fs');
log4js.configure({
    appenders:[{
        type: 'console'
    },{
        type: 'dateFile',
        absolute: true,
        filename: __dirname + '/../logs/access.log',
        maxLogSize: 1024 * 1024,
        backup: 3,
        pattern: "-yyyy-MM-dd",
        alwaysIncludePattern: true,
    },{
        type: 'dateFile',
        absolute: true,
        filename: __dirname + '/../logs/error.log',
        maxLogSize: 1024 * 1024,
        backup: 3,
        pattern: "-yyyy-MM-dd",
        alwaysIncludePattern: true,
        category: 'errorLog'

    },{
        type: 'dateFile',
        absolute: true,
        filename: __dirname + '/../logs/sql.log',
        maxLogSize: 1024 * 1024,
        backup: 3,
        pattern: "-yyyy-MM-dd",
        alwaysIncludePattern: true,
        category: 'sqlLog'
    }],
    replaceConsole: true
});
var  confirmParth = function(pathStr){
    if(!fs.existsSync(pathStr)){
        fs.mkdirSync(pathStr);
    }
}

