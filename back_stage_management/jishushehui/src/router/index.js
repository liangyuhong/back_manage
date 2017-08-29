import Vue from 'vue'
import Router from 'vue-router'
import View from "@/view/home"
import Vuex from 'vuex'
import axios from 'axios'
import question from "@/view/question"
import classinfo from "@/view/classinfo"
import classpeople from "@/view/classpeople"
import intercount from "@/view/intercount"
import interview from "@/view/interview"
import typeList from "@/view/typeList"
import Login from "@/view/login"
import Err404 from "@/view/error/404"
import store from '@/store/index'
// import Err401 from "@/view/error/401"
Vue.use(Router)
Vue.use(Vuex)
var $http = axios.create({
    baseURL: "http://localhost:8099", //打包上线的时候替换baseUrl
    // timeout: 1000,
    headers: { 'X-Custom-Header': 'footer' }
});
let newRouter = new Router({
    mode: 'history',
    routes: [{
            path: '/login',
            name: "login",
            component: Login,
            hidden: true
        },
        { path: '/404', component: Err404, hidden: true },
        // { path: '/401', component: Err401, hidden: true },
        // { path: '*', redirect: "/404", hidden: true }


    ]
})
let routrArr = [{
        path: '/',
        name: '知识管理',
        redirect: "/question",
        component: View,
        icon: "../../static/images/2_07.jpg",
        children: [
            { path: "question", component: question, name: "问题统计" },
            { path: "typelist", component: typeList, name: "类型列表" }
        ]
    }, {
        path: '/',
        name: '班级管理',
        component: View,
        icon: "../../static/images/3_10.jpg",
        children: [
            { path: "/classinfo", component: classinfo, name: "班级信息" },
            { path: "/classpeople", component: classpeople, name: "班级人员" },
            { path: "/intercount", component: intercount, name: "面试统计" },
            { path: "/interview", component: interview, name: "面试管理" }


        ]
    }]
    //学生需渲染的项目
let studentRouter = {
    "知识管理": [
        "问题统计"
    ],
    "班级管理": [
        "班级信息", "面试统计", "面试管理"
    ]
}

let isNameItem = (name, arr) => {
    let flg = "";
    for (var item in arr) {
        if (arr[item].name == name) {
            flg = arr[item];
        }
    }
    return flg;
}


let getTypeRouter = (routrArr, routerRule) => {
        let newsRouter = [];
        for (var key in routerRule) {
            for (var i = 0; i < routrArr.length; i++) {
                if (key == routrArr[i].name) {
                    //克隆
                    let newItem = Object.assign({}, routrArr[i]);

                    newsRouter[newsRouter.length] = newItem

                    newsRouter[newsRouter.length - 1].children = [];
                    if (routrArr[i].children.length > 0) {
                        for (var j = 0; j < routerRule[key].length; j++) {
                            let chidren = isNameItem(routerRule[key][j], routrArr[i].children);
                            if (chidren) {

                                newsRouter[newsRouter.length - 1].children.push(chidren)
                            }
                        }
                    }
                }
            }
        }
        return newsRouter;
    }
    //获取后台动态权限数据
let Routers = function() {
    var promise = new Promise(function(resolve, reject) {
        var userInfo = store.getters['user/getUserInfo'];
        //console.log(userInfo)
        if (userInfo != undefined) {
            let userType = userInfo.usercode;
            $http.get("/api/getpower?typeid=" + parseInt(userType), {}).then((res) => {
                //console.log(res)
                let powerList = JSON.parse(res.data.data[0].power);

                let newsRouters = getTypeRouter(routrArr, powerList);

                newRouter.addRoutes(newsRouters)
                newRouter.addRoutes([{
                        path: '*',
                        redirect: '/404',
                        hidden: true
                    }])
                    //为对象添加新的方法
                Object.assign(newRouter.options.routes, newsRouters);
                resolve()
            })

        }
    })
    return promise;
}
Routers()


//登录拦截器
newRouter.beforeEach((to, from, next) => {
    if (from.path == "/login") {
        Routers().then(function() {
            next()
        })
    }
    //判断是否已经登录
    var userKey = store.getters['user/getUserInfo'];
    if (!userKey && to.path != "/login") {
        next("login")
    } else {
        next()
    }
})




export default newRouter;