//导入用户集合构造函数
const { User } = require('../../model/user');

const bcrypt = require('bcrypt');
module.exports = async (req, res) => {
    // 接收请求参数
    // res.send(req.body);
    const { email, password } = req.body;
    //如果用户没有输入邮件地址
    // if (email.trim().length == 0 || password.trim().length == 0) return res.status(400).send('<h4>邮件地址或者密码错误</h4>');
    // 服务端出错
    if (email.trim().length == 0 || password.trim().length == 0) return res.status(400).render('admin/error', { msg: '邮件地址或者密码错误' });//render('admin/error') 渲染模板  相当于重定向 
    //根据邮箱地址查询用户信息
    //如果查询到了用户 user变量的值是对象类型 对象中存储的是用户信息
    //如果没有查询到用户 user变量为空
    let user = await User.findOne({ email });
    // console.log(user);
    if (user) {
        //将客户端传递过来的密码和用户信息中的密码进行比对
        // true 比对成功
        // false 比对失败
        let isValid = await bcrypt.compare(password, user.password);//明文密码和暗文密码比对
        if (isValid) {
            //登陆成功
            //将用户名存储在请求对象中
            req.session.username = user.username;
            //将用户角色存储在session对象中
            req.session.role= user.role;
            // res.send('登陆成功');
            req.app.locals.userInfo = user;
            //对用户的角色进行判断
            if(user.role == 'admin'){
                // 重定向到用户列表页面
                res.redirect('/admin/user');
            }else {
                res.redirect('/home/');
            }
            //重定向到用户列表页面
            // res.redirect('/admin/user');
        } else {
            // 没有查询到用户
            res.status(400).render('admin/error', { msg: '邮箱地址或者密码错误' });
        }
    } else {
        //没有查询到用户
        res.status(400).render('admin/error', { msg: '邮箱地址或者密码错误' });
    }
}