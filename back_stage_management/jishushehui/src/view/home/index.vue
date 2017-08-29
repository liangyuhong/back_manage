<template>
   <!--头部!-->
    <div class="container">   
      <el-row class="topheader">
        <el-col :span="20">
             <div class="leftItem">
                <img src="../../../static/images/1_03.jpg" alt="">
             </div> 
        </el-col>
        <el-col :span="4">
            <div class="rightItem">
                <el-dropdown>
                    <span class="el-dropdown-link">
                    {{getUserInfo.username}}<img :src="getUserInfo.photo" alt=""></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>个人信息</el-dropdown-item>
                      <el-dropdown-item>设置</el-dropdown-item>
                      <el-dropdown-item>我的收藏</el-dropdown-item>
                      <el-dropdown-item  @click.native="loginOut()">退出登录</el-dropdown-item>
                     
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-col>
      </el-row>
    
    <div class="content-menu">
        <el-row class="tac">
            <!--左侧列表!-->
            <el-col class="left-menu">
                <el-menu default-active="2" class="el-menu-vertical-demo" :router="flag">
                <el-submenu v-for="(item,index) in $router.options.routes" :index="index+''" v-if="!item.hidden">
                    <template slot="title"><i class="el-icon-message"></i>{{item.name}}</template>
                    <el-menu-item v-for="(child,index2) in item.children" :index="child.path">{{child.name}}</el-menu-item>
                </el-submenu>
                </el-menu>
            </el-col>
            <!--右侧列表!-->
            <el-col class="right-menu" >
                <div class="list-content">
                   <h5>面试专题</h5>
                   <el-breadcrumb separator="/" class="data-menu">
                        <el-breadcrumb-item v-for="item in $route.matched">{{item.name}}</el-breadcrumb-item>
                   </el-breadcrumb>
                   <div class="list-table">
                      <router-view></router-view>
                   </div>
              </div>   
            </el-col>
        </el-row>        
    </div>
  </div>
    

</template>

<script>
import {mapGetters} from "Vuex";
export default {
  name: 'view',
  data () {
    return {
       flag:true
    }
 
  },
  computed:{
       ...mapGetters({
          "getUserInfo":'user/getUserInfo'
       })
      
  },
  methods:{
    loginOut(){
      let that=this;
      this.$store.dispatch("user/loginOut",function(){
         that.$router.push("/login")
      })

    }
  }
}
</script>

<style lang="less" scoped>
 
 .container{
   width:100%;
   background:#fff;
 }
 .topheader{
        width:100%;
        height:80px;
        background:#2945cc;
        position:fixed;
        top:0;
        left:0;
        bottom:0;
        z-index:100;
        .leftItem{
         
          img{
              float:left;
              height:60px;
              display:block;
              margin-left:30px;
              margin-top:10px;
             
          }
         
        }
        .rightItem{
            height:80px;
            line-height:80px;
            float:right;
            padding-right:50px;
          
            .el-dropdown-link{
              color:#fff;
              img{
                width:50px;
                display:inline-block;
               vertical-align:middle;
               padding-left:10px;
              }
            }
           
            
           
        }
    }

    .content-menu{
      background:#fff;
      margin-top:80px;
      .left-menu{
        position:fixed;
        top:80px;
        left:0;
        bottom:0;
        width:200px;
        height:100% ;
        background:#fff;
        z-index:1000;
        border-right:1px solid #ccc;
       
      }
      .right-menu{
        padding-left:200px;
       
        .list-content{
          padding:20px;
          height:100%;
          background:#fff;
          h5{
            float:left;
          }
          .data-menu{
            float:right;
           
          }
          .list-table{
              margin-top:40px;
          }
        }
      }
    }
    
    
</style>
