<template>
 <!--右边table!-->
  <div class="question-page" >
   <div class="list-form">
            <div class="form-input">
                <el-input v-model="input" placeholder="问题" class="question"></el-input>
                
                <el-select v-model="value" placeholder="类型">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="form-btn">
                <el-button type="primary" icon="search">搜索</el-button>
                <el-button type="primary" icon="plus" @click="dialogFormVisible = true">添加</el-button>
                <!--点击添加弹出框!-->
                <el-dialog title="提出问题" :visible.sync="dialogFormVisible">
                    <el-form :model="form">
                        <el-form-item label="类型" :label-width="formLabelWidth">
                            <el-select v-model="value2" placeholder="请选择">
                                <el-option
                                v-for="item in option2"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        
                        <el-form-item label="问题" :label-width="formLabelWidth">
                        <el-input v-model="input2" placeholder="请输入内容"></el-input>
                        </el-form-item>
                        <el-form-item label="答案" :label-width="formLabelWidth">
                        <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="textarea2">
                        </el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="getQuestion()">确 定</el-button>
                    </div>
                </el-dialog>
                <el-button type="primary" icon="document">导出</el-button>
            </div>
            
    </div>

    <div class="list-table" v-loading.body="loading">
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                prop="id"
                label="序号"
                width="80">
                </el-table-column>
                <el-table-column
                prop="date"
                label="时间"
                width="150">
                </el-table-column>
                <el-table-column
                prop="question"
                label="问题"
                width="230">
                </el-table-column>
                <el-table-column
                prop="content"
                label="推荐答案">
                </el-table-column>
                <el-table-column
                label="" width="200">
                    <template scope="scope">
                        <el-button type="success" size="mini" @click="dialogFormVisibleTwo =true">回答</el-button>
                        <!--点击回答弹出框!-->
                        <el-dialog title="回答" :visible.sync="dialogFormVisibleTwo">
                            <el-form :model="form">
                                <el-input
                                    type="textarea"
                                    :rows="4"
                                    placeholder="请输入内容"
                                    v-model="textarea2">
                                </el-input>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="dialogFormVisibleTwo = false">取 消</el-button>
                                <el-button type="primary" @click="addanswer(scope.row.id)">确 定</el-button>
                            </div>
                        </el-dialog>
                        <el-button type="info" size="mini" @click="getDetail(scope.row.id)">详情</el-button>
                            <el-dialog title="详情" :visible.sync="dialogFormVisibleThree">
                                <el-form :model="form">
                                    <el-input
                                        type="textarea"
                                        :rows="6"
                                        placeholder="请输入内容"
                                        v-model="textarea3">
                                    </el-input>
                                </el-form>
                                <div slot="footer" class="dialog-footer">
                                   <el-button type="primary" @click="dialogFormVisibleThree = false">确 定</el-button>
                                </div>
                            </el-dialog>
                        <el-button type="danger" size="mini" @click="deleteItem(scope.row.id,scope.$index)">删除</el-button>
                    </template>
                    
                </el-table-column>
            </el-table>
        </div>
         <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 40, 60]"
                :page-size="1"
                layout="total, sizes, prev, pager, next, jumper"
                :total="listCount">
            </el-pagination>
    </div>
 </div>               
</template>

<script>

export default {
   
  name: 'question',
  data () {
    return {
        currentPage: 1,
        listCount: 0,
        input: '',
        value:"",
        textarea:"",
        textarea2:"",
        textarea3:"",
        value2:"",
        input2:"",
        tableData:[],
        loading:false,
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        options: [{
          value: '选项1',
          label: 'JQuery'
        }, {
          value: '选项2',
          label: 'JAVA'
        }, {
          value: '选项3',
          label: 'HTML5'
        }, {
          value: '选项4',
          label: 'VUE'
        }, {
          value: '选项5',
          label: 'REact'
        },
        {
          value: '选项6',
          label: 'Angular'
        }],
        option2: [{
          value: '选项1',
          label: 'JQuery'
        }, {
          value: '选项2',
          label: 'JAVA'
        }, {
          value: '选项3',
          label: 'HTML5'
        }, {
          value: '选项4',
          label: 'VUE'
        }, {
          value: '选项5',
          label: 'REact'
        },
        {
          value: '选项6',
          label: 'Angular'
        }],
        dialogFormVisible: false,
        dialogFormVisibleTwo: false,
        dialogFormVisibleThree:false,
        form: {
          delivery: false,
          type: []
          
        },
        formLabelWidth: '120px',
    }
  },
  created(){
      this.getQuestionList(1)
  },
  methods: {
      //从数据库中请求数据显示
       getQuestionList ( page ) {
            var that = this;
            this.loading=true;
            this.$axios.get( '/api/questionList',{
                pageSize:5,
                page: page-1
            } ).then( ( res ) => {
               // console.log( res )
                 that.loading=false;
                 that.tableData = res.data.data;
                 that.listCount = res.data.count;
            } )
            },
        //获取输入的问题 回答 
        getQuestion(){
            this.dialogFormVisible = false;
             this.$axios.post("/question",{
               dateTime:new Date(),
               questionText:this.input2,
               answerText:this.textarea2
            }).then((res)=>{
               //console.log(res.data.code)
               if(res.data.code){
                 window.location.reload()
               }
               
            })
        },
        //添加回答
        addanswer(id){
            this.dialogFormVisibleTwo = false;
            console.log(id)
            this.$axios.post("/answer",{
                addText:this.textarea2,
                ansId:id
            }).then((res)=>{
                console.log(res.data.code)
                if(res.data.code){
                    window.location.reload()
               }
            })
        },
        //点击详情
        getDetail(id){
           this.dialogFormVisibleThree =true;
           this.$axios.post( '/detail',{
                detailId:id
            } ).then( ( res ) => {
                var str="";
                for(var i=0;i<res.data.msg.length;i++){
                    str+=(i+1)+"."+res.data.msg[i].content+"\n"
                };
               this.textarea3=str;
            } )
        },
       
        //点击删除
        deleteItem(id,index){
            var that=this;
            console.log(index)
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            this.$message({
                type: 'success',
                message: '删除成功!'
            })

            this.$axios.post("/del",{
                delId:id
            }).then((res)=>{
                if(res.data.code){
                   that.tableData.splice(index,1)
                };   
            })
            })
            .catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });          
            });
        
        },
        handleSizeChange(val) {
           // console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
           // console.log(`当前页: ${val}`);
            this.getQuestionList(val);
        }
        
    
    }
  
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .question{
        width:160px;
    }
    .list-form{
      
       .form-input{
           float:left;
           margin-bottom:43px;
       }
       .form-btn{
           float:right;
       }
       
    }
    .list-table{
        margin-top:20px;
    }
    .block{
        margin-top:20px;
    }
    
</style>
