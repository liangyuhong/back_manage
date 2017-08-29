let questionDB = require("../dbModules/question");
//获取问题表格数据
module.exports = function(app) {
    app.get("/api/questionList", function(req, res) {
        questionDB.getQuestionList().then(function(response) {
            res.writeHead(200, { "Conent-type": "text/plain;chartset=utf-8" });
            var data = {
                code: 200,
                data: response
            };
            res.end(JSON.stringify(data))
        })


    })
}