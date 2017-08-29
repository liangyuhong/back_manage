let path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cors = require("cors");

let connection = require("./dbModules/dbconnection.js");
let user = require("./model/user"),
    question = require("./model/question");


let app = express(),
    port = 8099;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
user(app);
question(app);

//获取添加的数据
app.post("/question", function(req, res) {
        if (req.body.questionText != "") {
            var dateTime = req.body.dateTime;
            var questionText = req.body.questionText;
            var answerText = req.body.answerText;
            var questionsql = "insert question(date,question) values(?,?)";

            connection.query(answersql, [], function(error, result) {
                res.send({ code: 1 })
            })
        }

    })
    //获取删除的数据
app.post("/del", function(req, res) {
        var delId = req.body.delId;
        var delsql = "delete from question where id=(?)";
        connection.query(delsql, [delId], function(error, result) {
            res.send({ code: 1 })
        })
    })
    //点击获取添加回答的数据
app.post("/answer", function(req, res) {
        if (req.body.addText != "") {
            var addText = req.body.addText;
            var ansId = req.body.ansId;
            var answersql = "insert answer(questionid,content) values(?,?)";
            connection.query(answersql, [ansId, addText], function(error, result) {
                res.send({ code: 1 })
            })
        }

    })
    //获取详情
app.post("/detail", function(req, res) {
    var detailId = req.body.detailId;
    var detailsql = "select * from answer where questionid=?";
    connection.query(detailsql, [detailId], function(error, result) {
        res.send({ code: 1, msg: result })
    })
})






module.exports = app.listen(port, function(err) {
    if (err) {
        console.log(err)
        return;
    }
    var url = 'http://localhost' + port;
    console.log("lostening at" + url + "\n")
})