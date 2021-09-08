
//引入bcrypt模块
const bcrypt = require('bcrypt');
//引入用户集合的构造函数
const {User,validateUser} =require('../../model/user');
module.exports = async (req, res,next) => {

    try{
       await validateUser(req.body)
    }catch(e){
        // 验证没有通过
        // e.message
        // 重定向会用户添加页面
        // return res.redirect(`/admin/user-edit?message=${e.message}`);
        // JSON.stringify() 将对象数据类型转换成字符串数据类型
        return next(JSON.stringify({ path: '/admin/user-edit', message: e.message })) //return 阻止向下执行
    }
    //根据邮箱地址查询用户是否存在
    let user = await User.findOne({email: req.body.email});
    // 如果用户已经存在 邮箱地址已经被别人占用
    if(user) {
        // 重定向会用户添加页面
        // return res.redirect(`/admin/user-edit?message=邮箱地址已经被占用`);
        return next(JSON.stringify({ path: '/admin/user-edit', message: '邮箱地址已经被占用' })) //return 阻止向下执行


    }
    // 对密码进行加密操作
    //生成随机字符串
    const salt = await bcrypt.genSalt(10);
    //加密
    const password = await bcrypt.hash(req.body.password,salt);
    //替换密码
    req.body.password = password;
    //将用户信息添加到数据库中
    await User.create(req.body);
    //重定向回用户列表页面
    res.redirect('/admin/user');
    // //客户端传递过来的请求参数req.body  post方法
    // res.send(req.body);
}


