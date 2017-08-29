<template>
 <!--登录页面!-->
  <div class="login-container">
    <el-form autoComplete="on" label-position="left" label-width="0px"
      class="card-box login-form">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="user">
        <el-input name="email" type="text"  placeholder="请输入邮箱/手机/用户名" v-model="loginForm.user" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input name="password" type="password" placeholder="密码"  v-model="loginForm.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" @click="logined()">
          登录
        </el-button>
      </el-form-item>
      
    </el-form>

    

  </div>
</template>

<script>

 export default {
   
    name: 'login',
    data() {
     return {
       loginForm:{
         user: '',
         password: ''
       }
          
      }
    },
    
    methods: {
      //用户密码输入框判断
      // loginInfo () {
      //   var obj={};
      //   if(this.user){
      //       if(this.password){
      //           obj.password=this.password
      //           if(/^1\d{10}$/.test(this.user)){
      //               console.log('电话')
      //               obj.tel=this.user
      //               this.logined(obj)
      //           }else if(/^[\u0391-\uFFE5]+$/.test(this.user)){
      //               console.log('用户名')
      //               obj.user=this.user
      //               this.logined(obj)
      //           }else if(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(this.user)){
      //             console.log('邮箱')
      //             obj.mail=this.user
      //             this.logined(obj)
      //           }else{
      //             this.$message({
      //               showClose: true,
      //               message: '用户不存在',
      //               type: 'error'
      //             });
      //           }
      //       }else{
      //         this.$message({
      //           showClose: true,
      //           message: '密码不能为空',
      //           type: 'error'
      //         });
      //       }
      //   }else{
      //     this.$message({
      //       showClose: true,
      //       message: '用户名不能为空',
      //       type: 'error'
      //     });
      //   }
      // },
      logined(){
          let that=this;
          this.$axios.post("/api/loginDo",this.loginForm).then((res)=>{
             let resData=res.data;
             //console.log(resData)
             if(resData.code==200){
             // let userKey=JSON.stringify(resData);
              // window.sessionStorage["userKey"]=userKey;
              //console.log(that.$store)
               that.$store.dispatch("user/setUserInfo",resData);
               that.$router.push({path:"/"});
             }else{
               that.$message.error(resData.msg);
             }
             
          })

                   
      }
    }
  }
</script>

<style  lang="less">
 
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 5px;
  }

  .login-container {
    position: relative;
    width: 100%;
    height: 100%;
    height: 100vh;
    background-color: #2d3a4b;
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #eeeeee;
      height: 47px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: #889aa4;
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: #eeeeee;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    .forget-pwd {
      color: #fff;
    }
  }
</style>
