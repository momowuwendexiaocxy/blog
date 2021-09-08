//创建文章集合
//引入mongoose第三方模块
const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true,'请填写文章标题'],
        minlength: 4,
        maxlength: 20
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true,'请传递作者']
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    cover: {
        type: String,
        default: null
    },
    content: {
        type: String
    }
});

//使用规则 ，创建文章集合
const Article = mongoose.model('Article',articleSchema);

//将用户集合作为模块成员进行导出
module.exports = {
    Article
}