<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-card class="box-card bold" shadow="hover">
          <div slot="header" class="clearfix">
            <span style="color: #606266;">总资金</span>
          </div>
          <div style="color: #E6A23C;">
            ¥ {{ total.toLocaleString() }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card bold" shadow="hover">
          <div slot="header" class="clearfix">
            <span style="color: #606266;">月收入</span>
          </div>
          <div style="color: #67C23A;">
            ¥ {{ mouthIncome.toLocaleString() }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card bold" shadow="hover">
          <div slot="header" class="clearfix">
            <span style="color: #606266;">年收入</span>
          </div>
          <div style="color: #67C23A;">
            ¥ {{ yearIncome.toLocaleString() }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card bold" shadow="hover">
          <div slot="header" class="clearfix">
            <span style="color: #606266;">总收入</span>
          </div>
          <div style="color: #67C23A;">
            ¥ {{ totalIncome.toLocaleString() }}
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-table
        :data="incomeTable"
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
          label="途径">
      </el-table-column>
      <el-table-column label="操作">
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
    <el-dialog title="修改订单" :visible.sync="dialogFormVisible" width="400px" @close="resetForm('incomeForm')">
      <el-form :rules="rulesIncome" ref="incomeForm" :model="incomeForm" label-width="80px" size="mini">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="incomeForm.name"></el-input>
        </el-form-item>
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editData(incomeForm)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import qs from 'qs'

export default {
  name: "Income",
  data() {
    return {
      total: '',
      mouthIncome: '',
      yearIncome: '',
      totalIncome: '',
      dialogFormVisible: false,
      incomeForm: {},
      incomeTable: [],
      pageData: {
        page: 1,
        rows: 5,
        total: 0
      },
      rulesIncome: {
        name: { required: true, message: '请输入姓名'},
        price: { required: true, message: '请输入金额'},
        way: { required: true, message: '选择收入途径'},
        date: { required: true, message: '请选择日期' }
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
  created() {
    this.getData(this.pageData.page, this.pageData.rows)
    this.queryCapital()
    this.queryYearMouthIncome()
  },
  methods: {
    async getData(page, rows) {
      let res = await this.$store.dispatch('queryIncomePage',{page, rows})
      this.incomeTable = res.data.list
      this.pageData.page = res.data.pageNum
      this.pageData.rows = res.data.pageSize
      this.pageData.total = res.data.total
    },
    async updateIncome(form) {
      let res = await this.$store.dispatch('updateIncome', qs.stringify(form));
      if (res.data == 200) {
        this.$message({
          message: '修改成功',
          type: 'success'
        });
        this.dialogFormVisible = false
        this.getData(this.pageData.page,this.pageData.rows)
        this.queryCapital()
        this.queryYearMouthIncome()
      } else {
        this.$message.error('修改失败');
      }
    },
    async delIncome(value){
      let res = await this.$store.dispatch('delIncome',qs.stringify(value));
      if (res.data == 200) {
        this.$message({
          message: '删除成功',
          type: 'success'
        });
        this.getData(this.pageData.page,this.pageData.rows)
        this.queryCapital()
        this.queryYearMouthIncome()
      } else {
        this.$message.error('删除失败');
      }
    },
    async queryCapital() {
      let res = await this.$store.dispatch('queryCapital');
      this.total = res.data.total
      this.totalIncome = res.data.income
    },
    async queryYearMouthIncome() {
      let res = await this.$store.dispatch('queryYearMouthIncome');
      this.yearIncome = res.data.yearIncome
      this.mouthIncome = res.data.mouthIncome
    },
    syncData(index, value) {
      this.dialogFormVisible = true
      this.incomeForm = Object.assign({},value)
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    editData(formName) {
      this.$refs['incomeForm'].validate((valid) => {
        if (valid) {
          this.updateIncome(formName);
        } else {
          return false;
        }
      });
    },
    delData(index, value) {
      this.delIncome(value)
    },
    currentChange(value) {
      this.pageData.page = value
      this.getData(this.pageData.page,this.pageData.rows)
    },
    sizeChange(value) {
      this.pageData.rows = value
      this.getData(this.pageData.page, this.pageData.rows)
    }
  }
}
</script>

<style scoped>
.bold {
  font-weight: 700;
}
</style>
