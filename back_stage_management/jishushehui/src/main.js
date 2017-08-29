// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import axios from "axios"
import router from './router'
import store from './store'
//import mock from "./mock/mock"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import echarts from 'echarts'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Vuex)


var instance = axios.create({
    baseURL: "http://localhost:8099", //打包上线的时候替换baseUrl
    // timeout: 1000,
    headers: { 'X-Custom-Header': 'footer' }
});
Vue.prototype.$axios = instance;

Vue.prototype.$echarts = echarts;


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App },
    created() {
        //添加权限操作
        // let power = {
        //     "知识管理": [
        //         "问题统计", "类型列表"
        //     ],
        //     "班级管理": [
        //         "班级信息", "面试统计", "班级人员"
        //     ]
        // }
        // this.$axios.post("/api/addpower", {
        //     typeid: 2,
        //     power: JSON.stringify(power)
        // }).then((res) => {

        // })

    }
})