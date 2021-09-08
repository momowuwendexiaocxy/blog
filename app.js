//引用express框架
const express = require('express');
const path = require('path');
//引入body-Parser模块 用来处理post请求参数
const bodyParser = require('body-parser');
//导入express-session模块
const session = require('express-session');
//导入art-tempate模板引擎
const template = require('art-template');
//导入dateformat第三方模块
const dateFormat = require('dateformat');
//导入morgan第三方模块
const morgan = require('morgan');
//导入config模块
const config = require('config');

//创建网站服务器
const app = express();
//数据库连接
require('./model/connect');
//处理post请求参数 // 只能处理普通表单提交的参数
app.use(bodyParser.urlencoded({ extended: false }));
//配置session
app.use(session({ 
    secret: 'secret key',
    saveUninitialized: false, //当用户没有登陆时，不保存cookie
    cookie:{
        maxAge: 24 * 60 * 60 * 1000
    }
}));

//做了以下这三步，才能使用 res.render();
//告诉express框架模板所在的位置
app.set('views', path.join(__dirname, 'views'));
//告诉express框架模板的默认后缀是什么
app.set('view engine', 'art');
//当渲染后缀为art的模板时 所使用的模板引擎是什么
app.engine('art', require('express-art-template'));
//向模板内部导入dateFormate变量
template.defaults.imports.dateFormat = dateFormat ;


//开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')));
//
console.log(config.get('title'));

//获取系统环境变量 返回值是对象
if (process.env.NODE_ENV == 'development'){
    //当前是开发环境 将客户端发送到服务器端的请求信息打印到控制台中
    console.log('当前是开发环境');
    // 只会打印在开发环境中
    app.use(morgan('dev'))
}else {
    //当前是生产环境
    console.log('当前是生产环境');
}

//引入路由模块
const home = require('./route/home');
const admin = require('./route/admin');

//拦截请求  判断用户登录状态
app.use('/admin',require('./middleware/loginGuard'));

//为路由匹配请求路径
app.use('/home', home);//在浏览器中输入/home地址栏 则匹配home路由
app.use('/admin', admin);//在浏览器中输入/admin地址栏 则匹配admin路由

//错误处理中间件
app.use((err,req,res,next)=>{
    //将字符串对象转换为对象类型
    // JSON.parse()
    const result = JSON.parse(err);
    // { path: '/admin/user-edit', message: '密码比对失败,不能进行用户信息的修改', id: id }
    let params = [];
    for(let attr in result){
        if(attr != 'path'){
            params.push(attr + '=' + result[attr]);
        }
    }
    res.redirect(`${result.path}?${params.join('&')}`);
})

//监听端口
app.listen(3000);//用户不输入，会自动加上
console.log('网站服务器启动成功');