var fs = require("fs");

function init(res) {
    var con = fs.readFileSync("./json/customer.json", "utf-8");
    con.length === 0 ? con = "[]" : null; //为了防止customer.json中什么都没有，content是一个空字符串，使用JSON.PARSE转换时会报错
    con = JSON.parse(con);
    res.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
    res.end(JSON.stringify(con));
}
module.exports={
    init:init
};