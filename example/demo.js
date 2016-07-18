
/**
调用接口方法 demo
*/

Client = require('./Client').Client;

                 
 //客户端对象,初始化参数必须填写
var client = new Client({
                //开发者的AppId
                'appId':'15122404163671048936',
                //密钥
                'secretKey':'LS_1ba0jd2AFBWkQVJ2bc2ck9baj4q8dav',
                //魔派SERVER SDK API请求地址  
                'serverRoot':'http://localhost:8003/yop-center',  
                //商户注册的用户id  
                'userId':'test@test.com'                     
                        }); 
/**
查询APP可用支付渠道列表
*/    

//查询参数
params={
};
client.request("/rest/v1.0/query/findChannelInfoByAppId",params,function (error,response) {     
             if(!error){
                var content=response.body;
                //验证签名
                var flag=client.certifyResponse(content);
                if(flag){
                      console.log("签名验证成功！");
                      console.log(response.body);
                     }
                     else{
                      console.log("签名验证失败！");
                      console.log(response.body);
                     } 
                 }
              else{
                  console.log(error);
                     }
              });
     
/**
预支付请求
*/
  var  prePayRequest={
      //商户系统的支付请求流水号
      "tradeNo":"834153959835644",   
      //支付渠道
      "payChannel":"ALIPAY",   
      //支付类型
      "payType":"APP",    
      //本次购买商品或服务名称           
      "productName":"33",    
      //描述        
      "productDescription":"apple",  
      //合计金额,精确到小数点后2位
      "amount":"1.00"       
                 };
    //请求参数
  var params={
    "prePayRequest":prePayRequest
             };      
  client.request("/rest/v1.0/pay/unifiedOrder",
      params,function (error,response) {
            if(!error){
                var content=response.body;
                //验证签名
                var flag=client.certifyResponse(content);
                if(flag){
                      console.log("签名验证成功！");
                      console.log(response.body);
                     }
                     else{
                      console.log("签名验证失败！");
                      console.log(response.body);
                     } 
                 }
              else{
                  console.log(error);
                     }
              });


/**
退款请求
*/
var refundRequest={
      //商户系统支付请求流水
      "tradeNo":"834153959836",
      //商户系统的退款请求流水号
      "refundNo":"333433",
      //合计金额，精确到小数点后2位
      "amount":"0.01",
      //描述
      "description":"我要退款~~~",
    };
var refundParams={
  "refundRequest":refundRequest
};
client.request("/rest/v1.0/pay/refund",refundParams,function (error,response) {
                  if(!error){
                var content=response.body;
                //验证签名
                var flag=client.certifyResponse(content);
                if(flag){
                      console.log("签名验证成功！");
                      console.log(response.body);
                     }
                     else{
                      console.log("签名验证失败！");
                      console.log(response.body);
                     } 
                 }
              else{
                  console.log(error);
                     }
              });

/**
 退款查询请求
*/

var queryFundParamas={
//商户订单编号，和发起支付请求中的requestFlowId一致
"tradeNo":"656113769613",
//商户退款流水
"refundNo":"20485228279"
};
client.request("/rest/v1.0/pay/queryRefundOrder",queryFundParamas,function (error,response) {
                if(!error){
                var content=response.body;
                //验证签名
                var flag=client.certifyResponse(content);
                if(flag){
                      console.log("签名验证成功！");
                      console.log(response.body);
                     }
                     else{
                      console.log("签名验证失败！");
                      console.log(response.body);
                     } 
                 }
              else{
                  console.log(error);
                     }
              });


/**
支付查询请求
*/

//请求参数
var params={
  //商户支付请求流水号
  tradeNo:"834153959835644" 
}; 
client.request("/rest/v1.0/pay/queryPaymentOrder",params,function (error,response) {
                if(!error){
                var content=response.body;
                //验证签名
                var flag=client.certifyResponse(content);
                if(flag){
                      console.log("签名验证成功！");
                      console.log(response.body);
                     }
                     else{
                      console.log("签名验证失败！");
                      console.log(response.body);
                     } 
                 }
              else{
                  console.log(error);
                     }
              });

