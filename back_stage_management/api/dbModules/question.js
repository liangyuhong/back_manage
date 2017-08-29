let connection = require("./dbconnection.js");
let questionDB = {};
//获取问题表格数据
questionDB.getQuestionList = function() {
    //promise 异步请求数据
    var promise = new Promise(function(resolve, reject) {

        let sql = "select * from question";
        //请求数据渲染table
        connection.query(sql, function(error, response) {
            if (error) {
                reject(error);
            } else {
                var questionList = response;
                for (let i = 0; i < questionList.length; i++) {
                    let answersql = "select * from answer where questionid=?";
                    let questionid = questionList[i].id;
                    connection.query(answersql, [questionid], function(error, response) {
                        //请求数据 答案是存在的
                        if (response.length >= 1) {
                            questionList[i]['content'] = response[0].content;
                        }
                        if (i >= questionList.length - 1) {
                            resolve(questionList)
                        }
                    })
                }


            }
        })
    });
    return promise;
}
module.exports = questionDB;