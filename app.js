const Koa = require('koa');

var app = new Koa();


// 打印url
app.use(async (ctx,next)=>{
    console.log(`${ctx.request.method} ${ctx.request.url}`);
    await next();
});

// 计算请求时间
app.use(async (ctx, next)=>{
    const start = new Date().getTime();
    await next();
    const ms = new Date().getTime() - start;
    console.log(`Time: ${ms}ms`)
});

app.use(async (ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello koa2</h1>';
});

app.listen(8080);