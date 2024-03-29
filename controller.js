const fs = require('fs');

function addMapping(router, mapping) {
    for (var url in mapping) {
        if(url.startsWith('GET ')){
            var path = url.substring(4);
            router.get(path,mapping[url]);
            console.log(`register URL mapping: GET ${path}`)
        }else if(url.startsWith('POST ')){
            var path = url.substring(5);
            router.post(path,mapping[url]);
            console.log(`register URL mapping: POST ${path}`)
        }else{
            console.log(`Invalid URL: ${url}`)
        }
    }
}


function addController(router,dir) {
    // 读取controller下文件
    var files = fs.readdirSync(__dirname + `/${dir}`);
    // 过滤js文件
    var js_files = files.filter((f) => {
        return f.endsWith('.js');
    });

    // 加入mapping
    for (var f of js_files) {
        console.log(`process controller: ${f}`);
        let mapping = require(__dirname + `/${dir}/${f}`);
        addMapping(router,mapping);
    }
}


module.exports = function(dir){
    let
        controllers_dir = dir || 'controllers',
        router = require('koa-router')();
    addController(router,controllers_dir);
    return router.routes();
}