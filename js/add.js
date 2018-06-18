var submit = document.getElementById("submit"),
    userName = document.getElementById("userName"),
    userAge = document.getElementById("userAge"),
    userTel = document.getElementById("userTel"),
    userAddress = document.getElementById("userAddress");

//解析URL问号传参传进来的值，有没有ID，如果有就是修改
var urlObj = queryURLParameter(window.location.href);
var flag = typeof urlObj.id === "undefined" ? false : true;
//先把数据获取，再绑定在表格中
if (flag){
    $.ajax({
        url: '/getInfo?id=' + urlObj["id"],
        success: function (jsonData) {
            var data = jsonData["data"];
            userName.value = data.name;
            userAge.value = data.age;
            userTel.value = data.tel;
            userAddress.value = data.address;
        }
    });

}

submit.onclick = function () {
    var obj = {
        name: userName.value,
        age: userAge.value,
        tel: userTel.value,
        address: userAddress.value
    };

    if (flag) {
        $.ajax({
            url: '/updateInfo?id=' + urlObj["id"],
            type: "post",
            data: JSON.stringify(obj),
            success: function (jsonData) {
                alert(jsonData.msg);
                window.location.href = "index.html";

            }
        });
        return;
    }
    $.ajax({
        url: '/addInfo',
        type: 'post',
        data: JSON.stringify(obj),
        success: function (jsonData) {
            if (jsonData && jsonData["code"] == 0) {
                alert(jsonData.msg);
                window.location.href = "index.html";
                return;
            }
        }
    })
};