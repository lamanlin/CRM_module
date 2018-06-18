var fs = require("fs");

function init(req,res) {
    var con = fs.readFileSync("./json/customer.json", "utf-8");
    con.length === 0 ? con = "[]" : null; //为了防止customer.json中什么都没有，content是一个空字符串，使用JSON.PARSE转换时会报错
    con = JSON.parse(con);
    var str = '';
    req.on("data", function (chunk) {
        str += chunk;
    });
    req.on("end", function () {
        if (str.length === 0) {
            res.writeHead(200, {'content-type': 'application/json;charset=utf-8'});
            res.end(JSON.stringify({
                code: 1,
                msg: "增加失败，没有传递任何职进来"
            }));
            return;
        }
        var data = JSON.parse(str);
        data["id"] = con["id"] === 0 ? 1 : parseInt(con[con.length - 1]["id"]) + 1;
        con.push(data);
        fs.writeFileSync("./json/customer.json", JSON.stringify(con), 'utf-8');
        res.writeHead(200, {'content-type': 'application/json;charset=utf-8'});
        res.end(JSON.stringify({
            code: 0,
            msg: "增加成功"
        }));

    });

}

module.exports = {
    init: init
};