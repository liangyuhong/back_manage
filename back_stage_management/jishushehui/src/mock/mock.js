import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { questionList } from '../api/question.js';

let mock = new MockAdapter(axios);

mock.onGet("/api/questionList").reply((config) => {

    var returnData = {
        count: questionList.length,
        page: config.pageSize,
        data: []
    }
    console.log(config.pageSize * config.page)
    for (var i = config.pageSize * config.page; i < (config.pageSize * config.page + config.pageSize); i++) {
        returnData.data.push(questionList[i])
    }

    //数据请求延时操作
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([200, returnData]);
        }, 3000)
    })
})