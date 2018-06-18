var fs = require("fs");

function init(query, res) {
    var con = fs.readFileSync("./json/customer.json", "utf-8");
    con.length === 0 ? con = "[]" : null; //为了防止customer.json中什么都没有，content是一个空字符串，使用JSON.PARSE转换时会报错
    con = JSON.parse(con);    var customerId = query["id"];
    var obj = {};
    var result={
        code:1,
        msg:"获取失败，没有传递信息",
        data:null
    };
    for (var i = 0; i < con.length; i++) {
        if (con[i]["id"] == customerId) {
            obj = con[i];
            break;
        }
    }
    result={
        code:0,
        msg:"获取成功",
        data:obj
    };
    res.writeHead(200, {"content-type": "application/json;charset=utf-8"});
    res.end(JSON.stringify(result));
}

module.exports = {
    init: init
};