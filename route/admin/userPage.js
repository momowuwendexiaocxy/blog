// 导入用户集合构造函数
const {User} = require('../../model/user');
module.exports = async (req, res) => {

    //标识 标识当前访问的是用户管理页面
    req.app.locals.currentLink = 'user';

    // 接收客户端(浏览器地址栏)传递过来的当前页参数
    let page = req.query.page || 1 ;
    //每一页显示的数据条数
    let pagesize = 5;
    //查询用户数据的总数
    let count = await User.countDocuments({});
    //总页数
    let total = Math.ceil(count/pagesize);
    // res.send('总数据条数' + count + '总页数是' + total);//res.*() 执行了这一条，下一条不能执行

    //页码对应的数据查询开始的位置
    let start = (page-1)*pagesize;

    // 将用户信息从数据库中查询出来
    let users = await User.find({}).limit(pagesize).skip(start);
    //渲染用户列表模板
    res.render('admin/user',{
        users:users,
        page:page,
        total:total,
        count:count
    });
}