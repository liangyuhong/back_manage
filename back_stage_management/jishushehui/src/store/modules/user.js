import Vue from "vue";
import Vuex from "vuex";
const User = {
    namespaced: true, //命名空间
    state: {
        userInfo: ""
    },
    getters: {
        getUserInfo: state => {
            //获取登录信息
            if (state.userInfo == "") {
                let userKey = window.sessionStorage['userKey'];
                if (userKey) {
                    state.userInfo = JSON.parse(userKey)
                } else {
                    state.userInfo = userKey;
                }
                //console.log(state.userInfo)
            }
            return state.userInfo;
        }

    },
    mutations: {
        SET_USER_INFO(state, userInfo) {
            state.userInfo = userInfo;
            window.sessionStorage['userKey'] = JSON.stringify(userInfo);

        },
        LOGIN_OUT(state, userInfo) {
            state.userInfo = "";
            window.sessionStorage.removeItem["userKey"]
        }
    },

    actions: {
        setUserInfo({ commit, state }, userInfo) {
            commit("SET_USER_INFO", userInfo)
        },
        loginOut({ commit, state }, outcallback) {
            commit("LOGIN_OUT");
            outcallback()
        }
    }
}

export default User;