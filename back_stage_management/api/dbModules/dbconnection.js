let mysql = require("mysql");
//配置
var options = {
        host: "localhost",
        port: "3306",
        user: "root",
        password: "123456",
        database: "jishushe",
        insecureAuth: true
    }
    //创建数据连接
var connection = mysql.createConnection(options);
connection.connect(function() {
    console.log("成功")
})
connection.on("error", function() {
    console.log("失败")
})
module.exports = connection;