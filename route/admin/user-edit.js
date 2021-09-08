const {User} = require('../../model/user');
module.exports = async (req,res)=>{

    //标识 标识当前访问的是用户列表页面
    req.app.locals.currentLink = 'user';

    // 获取到地址来中的id参数
    const { message ,id} = req.query; //req.query 是客户端传递参数的对象{username:'zhangsan',email:'123@qq.com'}
    
    //如果当前传递了id参数
    if(id){
        //修改操作
       let user = await User.findOne({_id:id});

       //渲染用户编辑页面(修改)
        res.render('admin/user-edit', {
            message: message,
            user:user,
            link: '/admin/user-modify?id='+id,
            button: '修改',
            h4: '修改用户'
        });
    }else{
        //添加操作
        res.render('admin/user-edit', {
            message: message,
            link: '/admin/user-edit',
            button: '添加',
            h4: '添加用户'
        });
    }

    
}