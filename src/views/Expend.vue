<template>
  <div>
    <el-row>
      <el-col :span="5">
        <el-card class="box-card bold" shadow="hover">
          <div slot="header" class="clearfix">
            <span>总资金</span>
          </div>
          <div style="color: #E6A23C;">
            ¥ {{ card.total.toLocaleString() }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="5">
        <el-card class="box-card bold" shadow="hover">
          <div slot="header" class="clearfix">
            <span>月支出</span>
          </div>
          <div style="color: #F56C6C;">
            ¥ {{ card.expendMouth.toLocaleString() }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card class="box-card bold" shadow="hover">
          <div slot="header" class="clearfix">
            <span>年支出</span>
          </div>
          <div style="color: #F56C6C;">
            ¥ {{ card.expendYear.toLocaleString() }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="5">
        <el-card class="box-card bold" shadow="hover">
          <div slot="header" class="clearfix">
            <span>总支出</span>
          </div>
          <div style="color: #F56C6C;">
            ¥ {{ card.expendTotal.toLocaleString() }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="5">
        <el-card class="box-card bold" shadow="hover">
          <div slot="header" class="clearfix">
            <span>欠款</span>
          </div>
          <div v-if="card.debt == 0 ? false : true" style="color: #F56C6C;">
            ¥ {{ card.debt.toLocaleString() }}
          </div>
          <div v-if="card.debt == 0 ? true : false" style="color: #C0C4CC">
            无
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-table
        :data="expendList"
        style="width: 100%; margin-top: 20px">
      <el-table-column
          prop="date"
          label="日期"
          width="180">
      </el-table-column>
      <el-table-column
          prop="name"
          label="姓名"
          width="180">
      </el-table-column>
      <el-table-column
          prop="price"
          label="金额">
      </el-table-column>
      <el-table-column
          prop="way"
          label="用途">
      </el-table-column>
      <el-table-column
          prop="payway"
          label="支付方式">
      </el-table-column>
      <el-table-column
          label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="syncData(scope.$index, scope.row)">编辑</el-button>
          <el-popconfirm title="确定要删除此条记录吗？" @confirm="delData(scope.$index, scope.row)">
            <el-button slot="reference" size="mini" type="danger" style="margin-left: 10px">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="block" style="text-align: center; margin-top: 20px;">
      <el-pagination
          @current-change="currentChange"
          @size-change="sizeChange"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="pageData.rows"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageData.total">
      </el-pagination>
    </div>
    <el-dialog title="修改订单" :visible.sync="dialogFormVisible" width="400px" @close="resetForm('expendForm')">
      <el-form :rules="rulesExpend" ref="expendForm" :model="expendForm" label-width="80px" size="mini">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="expendForm.name"></el-input>
        </el-form-item>
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editData(expendForm)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import qs from 'qs'
import {mapState} from 'vuex'

export default {
  name: "Expend",
  data() {
    return {
      dialogFormVisible: false,
      expendForm: {},
      pageData: {
        page: 1,
        rows: 10,
        total: 0
      },
      rulesExpend: {
        name: { required: true, message: '请输入姓名'},
        price: { required: true, message: '请输入金额'},
        way: { required: true, message: '请选择支出用途' },
        payway: { required: true, message: '请选择支出方式' },
        date: [{ required: true, message: '请选择日期', trigger: 'change' }],
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
    }
  },
  computed: {
    ...mapState(['card','expendList'])
  },
  methods: {
    async getData (page, rows) {
      let res = await this.$store.dispatch('queryExpendPage', {page, rows})
      this.pageData.page = res.data.pageNum
      this.pageData.rows = res.data.pageSize
      this.pageData.total = res.data.total
    },
    async editDataEvent(form) {
      let res = await this.$store.dispatch('updateExpend',qs.stringify(form))
      if (res.data == 200) {
        this.$message({
          message: '已修改',
          type: 'success'
        });
        this.getData(this.pageData.page,this.pageData.rows)
        this.$store.dispatch('queryCapital');
        this.$store.dispatch('queryYearMouth')
        this.dialogFormVisible = false
      } else {
        this.$message.error('修改失败');
      }
    },
    async delData(index, value) {
      let res = await this.$store.dispatch('delExpend', qs.stringify(value))
      if (res.data == 200) {
        this.$message({
          message: '删除成功',
          type: 'success'
        });
        this.getData(this.pageData.page,this.pageData.rows)
        this.$store.dispatch('queryCapital');
        this.$store.dispatch('queryYearMouth')
      } else {
        this.$message.error('删除失败');
      }
    },
    syncData(index, value) {
      this.dialogFormVisible = true
      this.expendForm = Object.assign({},value)
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    editData(form) {
      this.$refs['expendForm'].validate((valid) => {
        if (valid) {
          this.editDataEvent(form)
        }
      });
    },
    currentChange(value) {
      this.pageData.page = value
      this.getData(this.pageData.page,this.pageData.rows)
    },
    sizeChange(value) {
      this.pageData.rows = value
      this.getData(this.pageData.page, this.pageData.rows)
    }
  },
  mounted() {
    this.getData(this.pageData.page,this.pageData.rows)
    this.$store.dispatch('queryCapital')
    this.$store.dispatch('queryYearMouth')

    let _this = this
    this.$bus.$on("queryExpend", function(){
      _this.getData(_this.pageData.page, _this.pageData.rows)
      _this.$store.dispatch('queryCapital')
      _this.$store.dispatch('queryYearMouth')
    })
  }
}
</script>

<style scoped>
.bold {
  font-weight: 700;
}
</style>