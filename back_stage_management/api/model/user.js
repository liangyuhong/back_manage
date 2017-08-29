let userDB = require("../dbModules/user");

module.exports = function(app) {
    app.post("/api/loginDo", function(req, res) {
            //console.log(req.body)
            userDB.LoginDo([
                req.body.user,
                req.body.password
            ]).then(function(response) {
                //console.log(response)
                res.writeHead(200, { "Content-type": "text/plain;chartset=utf-8" });
                var data = {};
                //判断数据是否存在
                if (response.length == 0) {
                    data = {
                        code: 400,
                        msg: "用户名密码错误"
                    }
                } else {

                    data = response[0];
                    data.code = 200;

                }
                //console.log(data)
                res.end(JSON.stringify(data))
            })

        })
        //添加权限
    app.post("/api/addpower", function(req, res) {
            userDB.addpower([
                req.body.typeid,
                req.body.power
            ]).then(function(response) {
                res.writeHead(200, { "Conent-type": "text/plain;chartset=utf-8" });
                var data = {
                    code: 200,
                    data: response
                };
                res.end(JSON.stringify(data))
            })
        })
        //获取权限
    app.get("/api/getpower", function(req, res) {

        userDB.getpower([
            req.query.typeid

        ]).then(function(response) {
            res.writeHead(200, { "Conent-type": "text/plain;chartset=utf-8" });
            var data = {
                code: 200,
                data: response
            };
            res.end(JSON.stringify(data))
        })
    })
}