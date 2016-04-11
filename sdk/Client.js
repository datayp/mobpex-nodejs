var request = require('request');
var util = require('./util');
var qs = require('querystring')

/**
 * 客户端
 * @param {Object} options
 * @constructor
 */
function Client(options) {
    if (!(this instanceof Client)) {
        return new Client(options);
    }
    options = options || {};
    if (!options.appId ) {
        throw new Error('appId  不能为空!');
    }
    if(!options.secretKey)
    {
        throw new Error('secretKey  不能为空!');
    }
     if(!options.userId)
    {
        throw new Error('userId  不能为空!');
    }
     if(!options.serverRoot)
    {
        throw new Error('serverRoot  不能为空!');
    }
    //设置参数
    this.serverRoot = options.serverRoot;
    this.appId = options.appId;
    this.userId = options.userId;
    this.secretKey = options.secretKey;
}

/**
 * 签名函数
 *
 * @param  {Object} params
 * @return {String} sign string
 */
Client.prototype.sign = function (params) {
    var sorted = Object.keys(params).sort();
    var basestring=this.secretKey;
    for (var i = 0, l = sorted.length; i < l; i++) {
        var key = sorted[i];
        basestring += key + params[key];
    }
    basestring += this.secretKey;
   return util.md5(basestring);
};

/**
 * 请求函数
 *
 * @param {String} method
 * @param {Object} params
 * @param {Function(err, result)} callback
 * @public
 */
Client.prototype.request = function (method,params,callback) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    var args = {
        "appId": this.appId,
        "format": 'json',
        "userId":this.userId,
        "format":'json',
        "locale":'zh_CN',
        "signRet":'true'
    };
    args['ts']=getCurrentTime();
    //获取版本号
    args['v']=getVersion(method);
    args['method']=method;
    //其余参数
    for (var k in params) {
        if(typeof params[k] == "object"){
            args[k] = JSON.stringify(params[k]);
        }else{
            args[k] = params[k];
        }
    }
    args['sign'] = this.sign(args);
    var options = {data: args};
    var url =this.serverRoot+method;
    request({
    url: url,  //url类似http：//XX.XX.XX.XX:8765
    method: 'post',
    form: args,//post的数据
    headers: {  "Content-Type":"application/x-www-form-urlencoded;charset=utf-8",
                "Cache-Control": "no-cache",
                "Connection": "Keep-Alive"}
    },callback);
};


/**
获取版本号
*/
function getVersion(method)
{
 if(null==method)
{
  throw new Error('method不能为空!');
}
else{
   if(method.startsWith("/rest")){
       var start=method.indexOf("/rest/v");
       if(start=="-1")
       {
        return ;
       }
       var end=method.indexOf("/",start+"/rest/v".length);
       if(end=="-1"){
        return;
       }
       var version=method.substring(start+"/rest/v".length,end);
       if(null!=version){
        return version;
       }
       return;
       
   }
   else{
     throw new Error('只支持rest风格');
   }
}
}

/**
获取当前时间
*/
function getCurrentTime()
{
    var date=new Date();
    return date.getTime();
}

/**
服务器返回数据校验
*/
Client.prototype.certifyResponse=function(params) {
      if(null==params||params.length<=0){
      return false;
      }
      var  jsonObj=JSON.parse(params);
      var resultTemp=jsonObj['result'];
      var result="";
      if (null!=resultTemp){
          result= JSON.stringify(jsonObj['result']); 
          result=result.replace('\t','').replace('\n','').replace(/ /g,'');
      }
      var status=jsonObj['state'];
      var ts=jsonObj['ts'];
      var ext="";
      if(null!=jsonObj["ext"]){
         ext= JSON.stringify(jsonObj['ext']); 
         ext=ext.replace('\t','').replace('\n','').replace(/ /g,'');
      }
      var resultStr=this.secretKey+status+result+ts+ext+this.secretKey;
      var signString= util.md5(resultStr);
      var sign =jsonObj['sign'];
      if(null!=sign&&signString==sign){
        return true;
      }
      return false;
 }

exports.Client = Client;
