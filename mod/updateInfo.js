var fs = require("fs"), url = require("url");

function init(req, res) {
    var urlObj = url.parse(req.url), query = urlObj.query;
    var con = fs.readFileSync("./json/customer.json", "utf-8");
    con.length === 0 ? con = "[]" : null; //为了防止customer.json中什么都没有，content是一个空字符串，使用JSON.PARSE转换时会报错
    con = JSON.parse(con);
    var str = '', customerId = query["id"];
    req.on("data", function (chunk) {
        str += chunk;
    });

    req.on("end", function () {
        if (str.length === 0) {
            var result = {
                code: 1,
                msg: "修改失败，没有传递任何职进来"
            };
            res.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
            res.end(JSON.stringify(result));
            return;
        }
        var flag = false;
        for (var i = 0; i < con.length; i++) {
            if (con[i]["id"] == customerId) {
                con.push(str);
                flag = true;
                break;
            }
        }
        if (flag){
            fs.writeFileSync("./json/customer.json", JSON.stringify(con), 'utf-8');
            result={
                code:0,
                msg:"修改成功"
            };
        }
        res.writeHead(200, {'content-type': 'application/json;charset=utf-8'});
        res.end(JSON.stringify(result));

    });

}

module.exports = {
    init: init
};