let connection = require("./dbconnection.js");
let userDB = {};
//获取登录数据
userDB.LoginDo = function(params) {
    //promise 异步请求数据

    var promise = new Promise(function(resolve, reject) {
        let sql = "select * from userlist where phone=? and password=?";
        var param = params;
        // console.log(param)
        connection.query(sql, param, function(error, response) {
            if (error) {
                reject(error);
            } else {
                resolve(response);
            }
        })
    })
    return promise;
}

//添加权限
userDB.addpower = function(params) {
        var promise = new Promise(function(resolve, reject) {
            let sql = "insert into powerlist (typeid,power) values(?,?)";
            var param = params;

            connection.query(sql, param, function(error, response) {
                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                }
            })
        })
        return promise;
    }
    //获取权限
userDB.getpower = function(params) {
    var promise = new Promise(function(resolve, reject) {
        let sql = "select * from powerlist where typeid=?";
        var param = params;
        //console.log(param)
        connection.query(sql, param, function(error, response) {
            if (error) {
                reject(error);
            } else {
                resolve(response);
            }
        })
    })
    return promise;
}
module.exports = userDB