var fs = require("fs");

function init(query, res) {
    var con = fs.readFileSync("./json/customer.json", "utf-8");
    con.length === 0 ? con = "[]" : null; //为了防止customer.json中什么都没有，content是一个空字符串，使用JSON.PARSE转换时会报错
    con = JSON.parse(con);
    var customerId = query["id"];
    var result = {
        code: 1,
        msg: "删除失败，没有传递信息",
        data: null
    };
    var obj = {};
    for (var i = 0; i < con.length; i++) {
        var cur = con[i];
        if (cur["id"] == query["id"]) {
            if (cur.id == query.id) {
                con.splice(i, 1);
                obj = cur;
                break;
            }
        }
    }
    //把最新（删除后的信息）重新写入一次
    fs.writeFileSync("./json/customer.json", JSON.stringify(con), "utf-8");
    result = {
        code: 0,
        msg: "删除成功",
        data: obj
    };

    res.writeHead(200, {"content-type": "application/json"});
    res.end(JSON.stringify(result));
}

module.exports = {
    init: init
};