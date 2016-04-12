
# Mobpex Nodejs SDK

### 简介

​        Mobpex Nodejs SDK 采用https与Mobpex通信，SDK提供了API的请求封装、摘要签名、响应解释等基础功能，通过SDK能实现查询APP可用支付渠道列表、发起预支付请求、发起退款请求、支付查询、退款查询等业务。

1. docs 目录下为 Mobpex Nodejs SDK 的使用文档。
2. example 目录下面为调用示例。
3. mobpexNodejsSDK 目录下为  SDK源文件 。

### 版本要求

建议使用Nodejs v0.8 以上版本

### 安装

下载源码后，在目录下运行 `npm install`

调用示例请参考example/demo.js




### 快速指引

首先您需要先完成以下几步：1、注册Mobpex用户;2、创建应用。

然后就可以使用SDK开发程序了:

1、商户服务端接收用户支付请求后通过Server SDK发起预支付请求；

2、商户服务端将Server SDK返回的内容(支付凭证)发送给客户端；

3、客户端调用Client SDK支付接口,传入支付凭证作为参数；

4、Client SDK将唤醒相应渠道支付控件引导用户完成支付。