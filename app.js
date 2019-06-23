const Koa = require('koa');

// koa-bodyparser
const bodyParser = require('koa-bodyparser');
// koa-router
// const router = require('koa-router')();
// 导入controller middleware:
const controller = require('./controller');

// koa
const app = new Koa();


// log request url
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// 计算请求时间
app.use(async (ctx, next) => {
    const start = new Date().getTime();
    await next();
    const ms = new Date().getTime() - start;
    console.log(`Time: ${ms}ms`);
});







// add bodyparser middleware
app.use(bodyParser());
// add router middleware
// app.use(router.routes());
app.use(controller());

app.listen(8080);

console.log('app started at port 8080...');