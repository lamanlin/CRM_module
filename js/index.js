var innerList = document.getElementById("innerList");
var customModule = (function () {

    //删除某一个客户信息
    function deleteInfo() {
        //使用事件委托
        innerList.onclick = function (e) {
            e = e || window.event;
            var target = e.target || e.srcElement,
                targetTag = target.tagName.toUpperCase();
            if (targetTag === "A" && target.innerHTML === "删除") {
                var customerId = target.getAttribute("customerId");
                var flag = window.confirm("确定要删除第" + customerId + "项客户信息吗？");
                if (flag) {
                    var parameter = "id=" + customerId;
                    parameter = encodeURIComponent(parameter);
                    $.ajax({
                        url: "/deleteInfo?" + parameter,
                        success: function (jsonData) {
                            if (jsonData && jsonData["code"] == 0) {
                                alert("删除成功！");
                                innerList.removeChild(target.parentNode.parentNode);
                            }
                        }
                    });
                }
            }
        }
    }

    //实现首页的数据绑定
    function bindHtml(data) {
        var str = '';
        for (var i = 0; i < data.length; i++) {
            var curData = data[i];
            str += '<li>';
            str += '<span class="w50">' + curData["id"] + '</span>';
            str += '<span class="w100">' + curData["name"] + '</span>';
            str += '<span class="w50">' + curData["age"] + '</span>';
            str += '<span class="w200">' + curData["tel"] + '</span>';
            str += '<span class="w200">' + curData["address"] + '</span>';
            str += '<span class="w100">';
            str += '<a href="javascript:;" customerId="' + curData["id"] + '">删除</a>';
            str += '<a href= "add.html?id=' + curData["id"] + '">修改</a>';
            str += '</span>';
            str += '</li>';
        }
        innerList.innerHTML = str;
    }


    //程序入口，发送ajax请求
    function init() {
        $.ajax({
            url: "/getAlldata",
            success: function (jsonData) {
                if (jsonData) {
                    var data = jsonData;
                    bindHtml(data);
                    deleteInfo()
                }
            }
        });
    }

    return {
        init: init
    }
})();
customModule.init();