// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
const router=require('koa-router')();
const bodyParser=require('koa-bodyparser');
const crypto=require('crypto');


// 创建一个Koa对象表示web app本身:
const app = new Koa();

// 打印请求地址
app.use(async(ctx, next) => {
    console.log(`${ctx.request.ip} ${new Date()} - ${ctx.method} ${ctx.url}`);
    await next();
});

// 打印时间
// app.use(async(ctx, next) => {
//     const start = new Date().getTime();
//     await next();
//     const ms = new Date().getTime()-start;
//     console.log(`Time: ${ms}ms`);
// });

// 对于任何请求，app将调用该异步函数处理请求：
// app.use(async(ctx, next) => {
//     await next();
//     // 设置response的Content-Type
//     ctx.response.type = 'text/html';
//     // 设置response的内容
//     ctx.response.body = '<h1>Hello, koa2!</h1>';
// });

router.get('/wx',async(ctx,next)=>{
    // console.log(ctx.query.signature);
    var token=`baocheng`;
    var signature=ctx.query.signature;
    var timestamp=ctx.query.timestamp;
    var nonce=ctx.query.nonce;
    var echostr=ctx.query.echostr;

    var array=new Array(token,timestamp,nonce);
    array.sort();
    var str=array.toString().replace(/,/g,"");

    var sha1Code=crypto.createHash("sha1");
    var code=sha1Code.update(str,'utf-8').digest("hex");

    if (code===signature) {
        ctx.response.body=echostr; 
    } else {
        ctx.response.body=`error`;
    }

});

router.get('/',async(ctx,next)=>{
    ctx.response.body=`<h1>Index</h1>`;
});

app.use(bodyParser());
app.use(router.routes());

// 在端口3000监听:
// app.listen(3000);
// 改为80端口监听
app.listen(80);
// 打印信息
// console.log('app started at port 3000...');
console.log('app started at port 80......')