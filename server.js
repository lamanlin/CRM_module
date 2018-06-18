var http = require("http"),
    fs = require("fs"),
    url = require("url");

var queryURL = require("./mod/queryURL");
var getAlldata = require("./mod/getAlldata");
var getInfo = require("./mod/getInfo");
var updateInfo = require("./mod/updateInfo");
var deleteInfo = require("./mod/deleteInfo");
var addInfo = require("./mod/addInfo");
var server = http.createServer(function (req,res) {
    var urlObj = url.parse(req.url),
        pathname = urlObj.pathname,
        query = queryURL.queryURLParameter(decodeURIComponent(urlObj.query));
    //创建监听服务端口
    var reg = /\.(HTML|CSS|JS|ICO)/i;
    if (reg.test(pathname)) {
        var suffix = reg.exec(pathname)[1].toUpperCase();
        var conType = suffix === "HTML" ? "text/html" : (suffix === "CSS" ? "text/css" : "text/javascript");
        try {
            var conFile = fs.readFileSync('.' + pathname, 'utf-8');
            res.writeHead(200, {'content-type': conType + ';charset=UTF-8;'});
            res.end(conFile);
        } catch (e) {
            res.writeHead(404);
            res.end("请求文件错误");
        }
        return;

    }

    //1、获取全部客户信息的接口
    if (pathname === "/getAlldata") {
        getAlldata.init(res);
        return;
    }
    //2、根据传进来的ID获取该客户信息
    if (pathname === "/getInfo") {
        getInfo.init(query, res);
        return;
    }
    //3、根据传进来的ID删除该客户信息
    if (pathname === "/deleteInfo") {
        deleteInfo.init(query, res);
        return;
    }
    //4、增加客户信息
    if (pathname === "/addInfo") {
        addInfo.init(req, res);
        return;
    }
    //5、根据传进来的ID修改该客户信息
    if (pathname === "/updateInfo") {
        addInfo.init(req, res);
        return;
    }

    //如果请求的端口都没有
    res.writeHead(404);
    res.end("你请求的端口不存在，请重新检查！");
});


server.listen(73, function () {
    console.log("服务创建成功，正在监听73端口");
});