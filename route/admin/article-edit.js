const { Article } = require('../../model/article');
module.exports = async  (req, res) => {

    //标识 标识当前访问的是文章管理页面
    req.app.locals.currentLink = 'article';//全局变量
    // 获取到地址来中的id参数
    const { id } = req.query; //req.query 是客户端传递参数的对象{username:'zhangsan',email:'123@qq.com'}
    
    //如果当前传递了id参数
    if (id) {
        //修改操作//想要查询外表中的数据，需要在find()后加上populate('author')
        let article = await Article.findOne({ _id: id }).populate('author').lean();
        // res.send(article.content);
        //渲染用户编辑页面(修改)
        res.render('admin/article-edit', {
            article: article,
            link: '/admin/article-modify?id=' + id,
            button: '修改',
            h4: '修改文章'
        });
    } else {
        //添加操作
        res.render('admin/article-edit', {
            link: '/admin/article-add',
            button: '发布',
            h4: '发布文章'
        });
    }
}