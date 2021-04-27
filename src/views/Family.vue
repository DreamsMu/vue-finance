<template>
  <div>
    <el-card class="box-card item" v-for="(item,index) in userData" :key="index">
      <div slot="header" class="clearfix">
        <span  style="font-weight: 700;" :class="item.power == '1' ? 'vip' : 'member'">{{item.name}}<i v-if="item.power == '1' ? true : false" class="el-icon-medal-1"></i></span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="open(item)">操作按钮</el-button>
      </div>
      <span>用户名：</span><span style="color: #909399; margin-right: 30px; font-size: 14px;">{{item.username}}</span>
      <span>密码：</span><span style="color: #909399; margin-right: 30px; font-size: 14px;">******</span>
      <span>权限：</span><span style="color: #909399; margin-right: 30px; font-size: 14px;">{{item.power == "1"? '管理员': '普通成员'}}</span>
    </el-card>

    <h1 v-if="userData.length == 0? true : false" style="color: #C0C4CC; text-align: center;">
      <i class="el-icon-info"></i>
      暂无其他家庭成员添加
    </h1>

    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="400px">
      <el-form :rules="rulesUser" ref="form" :model="form" label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="权限"  prop="power">
          <el-switch
            v-model="form.power"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="管理员"
            inactive-text="普通成员"
            active-value="1"
            inactive-value="0">
          </el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="close">取 消</el-button>
    <el-button type="primary" @click="onSumbit(form)">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import qs from 'qs'

export default {
  name: "family",
  data() {
    return {
      dialogVisible: false,
      master: 0,
      form: {},
      userData: [],
      rulesUser:{
          name: { required: true, message: '请输入姓名' },
          username:{ required: true, message: '请输入用户名' },
          password:{ required: true, message: '请输入密码' },
          power: { required: true, message: '请选择权限' }
      }
    }
  },
  methods: {
    async getData() {
      let res = await this.$store.dispatch('queryUser',
        qs.stringify({id:this.$store.state.user.id, family_id: this.$store.state.user.family_id}))
      this.userData = res.data
    },
    open(value) {
      if (this.$store.state.user.power == 1) {
        this.form = Object.assign({},value)
        this.dialogVisible = true
      } else {
        this.$message({
            type: 'error',
            message: "对不起，您无权访问!"
        })
      }
    },
    close() {
      this.dialogVisible = false
    },
    async submitEvent(value) {
      let res = await this.$store.dispatch('updateUser',qs.stringify(value));
      if (res.data == 200) {
          this.$message({
              type: 'success',
              message: "已修改"
          })
          this.dialogVisible = false
          this.getData()
      } else if (res.data == 222) {
          this.$message({
              type: 'error',
              message: "用户名已存在"
          })
      } else {
          this.$message({
              type: 'error',
              message: "数据错误，请修改后重试"
          })
      }
    },
    onSumbit(value) {
      this.$refs['form'].validate((valid) => {
          if (valid) {
            this.submitEvent(value)
          } else {
              return false;
          }
      });
    }
  },
  created() {
   this.getData()
  }
}
</script>

<style scoped>
.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.vip{
  color: rgb(207, 164, 114);
}
.member {
  color: #409EFF; 
}
</style>
