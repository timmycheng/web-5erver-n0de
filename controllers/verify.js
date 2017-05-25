var verify_wx=async(ctx,next)=>{
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
};
module.exports={
    'GET /wx':verify_wx
};