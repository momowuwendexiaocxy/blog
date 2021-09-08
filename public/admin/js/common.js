function serializeToJson(form) {
    var result = {};
    // 返回值 [{name:'email',value:'用户输入的内容'}]
    var f = form.serializeArray();
    f.forEach(function (item) {
        //result.email
        result[item.name] = item.value;
    });
    return result;
}