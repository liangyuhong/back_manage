let Mock = require('mockjs');

let questionList = [];

let Random = Mock.Random;

for (var i = 0; i < 100; i++) {
    questionList.push({
        id: Random.increment(),
        title: Random.ctitle(5, 15) + "?",
        answer: Random.cparagraph(),
        date: Random.date('yyyy-MM-dd')
    })
}

export {
    questionList
};