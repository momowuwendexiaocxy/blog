const {Article} = require('../../model/article');
//导入分页模块
const pagination = require('mongoose-sex-page');
module.exports = async (req,res)=>{
    let page = req.query.page;
    //从数据库中查询数据
    let result = await pagination(Article).find().page(page).size(4).display(5).populate('author').exec();//多集合联合查询
    let str = JSON.stringify(result);
    let json = JSON.parse(str);
    // res.send('欢迎来到博客首页');
    //渲染模板并传递数据
    res.render('home/default',{
        result: json
    });
}