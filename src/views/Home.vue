<template>
  <div class="home">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <el-menu
            :default-active="this.$router.currentRoute.name"
            class="el-menu-vertical-demo el-aside-menu">
          <el-menu-item index="Main" @click="goMain">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="Income" @click="goIncome">
            <i class="el-icon-s-cooperation"></i>
            <span slot="title">收入详情</span>
          </el-menu-item>
          <el-menu-item index="Expend" @click="goExpend">
            <i class="el-icon-s-goods"></i>
            <span slot="title">支出详情</span>
          </el-menu-item>
          <el-menu-item index="Chart" @click="goChart">
            <i class="el-icon-s-data"></i>
            <span slot="title">报表</span>
          </el-menu-item>
          <el-menu-item index="Family" @click="goFamily">
            <i class="el-icon-user-solid"></i>
            <span slot="title">成员管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!--右侧容器-->
      <el-container>
        <!-- 顶部导航栏 -->
        <el-header>
          <el-menu class="el-menu-demo" mode="horizontal">
            <el-menu-item>家庭财务管理系统<i class="el-icon-s-management"></i></el-menu-item>
            <el-submenu index="" style="float: right">
              <template slot="title">
                {{ $store.state.user.name }}
              </template>
              <el-menu-item @click="goUserSet"><i class="el-icon-s-tools"></i>账户设置</el-menu-item>
              <el-menu-item @click="exit"><i class="el-icon-switch-button"></i>登出</el-menu-item>
            </el-submenu>
            <el-menu-item style="float: right"><el-link @click="dialogFormVisible = true" icon="el-icon-edit" :underline="false">添加一笔</el-link></el-menu-item>
          </el-menu>
        </el-header>
        <!-- 主内容区 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <!-- 添加订单对话框 -->
    <el-dialog title="添加一笔" :visible.sync="dialogFormVisible" width="400px" @close="resetForm">
      <!-- 标签页 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!-- 收入内容 -->
        <el-tab-pane label="收入" name="first">
          <el-row>
            <el-col>
              <el-form :rules="rulesIncome" ref="incomeForm" :model="incomeForm" label-width="80px" size="mini">
                <el-form-item label="金额" prop="price">
                  <el-input type="number" v-model="incomeForm.price"></el-input>
                </el-form-item>
                <el-form-item label="收入途径" prop="way">
                  <el-select v-model="incomeForm.way" placeholder="请选择收入途径">
                    <el-option label="工资" value="工资"></el-option>
                    <el-option label="兼职" value="兼职"></el-option>
                    <el-option label="理财" value="理财"></el-option>
                    <el-option label="礼金" value="礼金"></el-option>
                    <el-option label="其它" value="其它"></el-option>
                    <el-option label="外借" value="外借"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="日期" prop="date">
                  <el-date-picker
                    v-model="incomeForm.date"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerOptions">
                  </el-date-picker>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-tab-pane>
        <!-- 支出内容 -->
        <el-tab-pane label="支出" name="second">
          <el-form :rules="rulesExpend" ref="expendForm" :model="expendForm" label-width="80px" size="mini">
            <el-form-item label="金额" prop="price">
              <el-input type="number" v-model="expendForm.price"></el-input>
            </el-form-item>
            <el-form-item label="支出用途" prop="way">
              <el-select v-model="expendForm.way" placeholder="请选择支出用途">
                <el-option label="餐饮" value="餐饮"></el-option>
                <el-option label="购物" value="购物"></el-option>
                <el-option label="日用" value="日用"></el-option>
                <el-option label="交通" value="交通"></el-option>
                <el-option label="娱乐" value="娱乐"></el-option>
                <el-option label="通讯" value="通讯"></el-option>
                <el-option label="服饰" value="服饰"></el-option>
                <el-option label="烟酒" value="烟酒"></el-option>
                <el-option label="医疗" value="医疗"></el-option>
                <el-option label="书籍" value="书籍"></el-option>
                <el-option label="礼金" value="礼金"></el-option>
                <el-option label="捐赠" value="捐赠"></el-option>
                <el-option label="债务" value="债务"></el-option>
                <el-option label="分期还款" value="分期还款"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="支出方式" prop="payway">
              <el-select v-model="expendForm.payway" placeholder="请选择支出方式">
                <el-option label="微信支付" value="微信支付"></el-option>
                <el-option label="支付宝支付" value="支付宝支付"></el-option>
                <el-option label="分期付款" value="分期付款"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="日期" prop="date">
              <el-date-picker
                v-model="expendForm.date"
                align="right"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addEvent()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import qs from 'qs'

export default {
  name: "home",
  data() {
    return {
      dialogFormVisible: false,
      activeName: 'first',
      incomeForm: {
        price: '',
        way: '',
        date: ''
      },
      expendForm: {
        price: '',
        way: '',
        payway: '',
        date: ''
      },
      rulesIncome: {
        price: { required: true, message: '请输入金额' },
        way: { required: true, message: '请输入收入途径' },
        date: { required: true, message: '请选择日期', trigger: 'change' }
      },
      rulesExpend: {
        price: { required: true, message: '请输入金额' },
        way: { required: true, message: '请选择支出用途' },
        payway: { required: true, message: '请选择支出方式' },
        date: { required: true, message: '请选择日期', trigger: 'change' }
      },
      pickerOptions: {
          disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      }
    };
  },
  methods: {
    goMain() {
      this.$router.push('/')
    },
    goIncome() {
      this.$router.push('/income')
    },
    goExpend() {
      this.$router.push('/expend')
    },
    goChart() {
      this.$router.push('/chart')
    },
    goFamily() {
      this.$router.push('/family')
    },
    goUserSet() {
      this.$router.push('/userset')
    },
    exit() {
      localStorage.setItem("token", 'false');
      localStorage.removeItem("id");
      localStorage.removeItem("name");
      localStorage.removeItem("power");
      localStorage.removeItem("master");
      localStorage.removeItem("family_id");
      this.$router.push('/login')
    },
    resetForm() {
      this.$refs['incomeForm'].resetFields();
      this.$refs['expendForm'].resetFields();
    },
    addEvent() {
      let formName = this.activeName == 'first' ? 'incomeForm' : 'expendForm'
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.activeName == 'first') {
            this.incomeSubmit()
          } else {
            this.expendSubmit()
          }
        } else {
          return false;
        }
      });
    },
    async incomeSubmit() {
      this.incomeForm.name = this.$store.state.user.name,
      this.incomeForm.family_id = this.$store.state.user.family_id
      let res = await this.$store.dispatch('insertIncomeData', qs.stringify(this.incomeForm))
      if (res.data == 200) {
        this.$message({
          message: '添加成功',
          type: 'success'
        });
        this.dialogFormVisible = false
        this.$router.go(0)
      } else {
        this.$message.error('添加失败');
      }
    },
    async expendSubmit() {
      this.expendForm.name = this.$store.state.user.name,
      this.expendForm.family_id = this.$store.state.user.family_id
      let res = await this.$store.dispatch('insertExpendData', qs.stringify(this.expendForm))
      if (res.data == 200) {
        this.$router.go(0)
        this.dialogFormVisible = false
        this.$message({
          message: '添加成功',
          type: 'success'
        });
      } else {
        this.$message.error('添加失败');
      }
    },
    handleClick(tab) {
      this.activeName = tab.name
    }
  }
}
</script>

<style scoped lang="less">
.home {
  .el-aside-menu {
    position: fixed;
    width: 200px;
    height: 100vh;
  }
}

</style>
