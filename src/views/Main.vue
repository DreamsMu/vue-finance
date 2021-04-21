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
            ¥ {{ totalIncome.toLocaleString() }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card bold" shadow="hover">
          <div slot="header" class="clearfix">
            <span style="color: #606266;">月支出</span>
          </div>
          <div style="color: #F56C6C;">
            ¥ {{ totalExpend.toLocaleString() }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card bold" shadow="hover">
          <div slot="header" class="clearfix">
            <span style="color: #606266;">月净收入</span>
          </div>
          <div style="color: #67C23A;">
            ¥ {{ netIncome.toLocaleString() }}
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-col :span="24">
        <div id="chart" style="height: 400px"></div>
      </el-col>
    </el-row>
    <el-divider>历史记录</el-divider>
    <el-timeline>
      <el-timeline-item :timestamp="item.date" placement="top" v-for="(item,index) in priceData" :key="index">
        <el-card  style="font-weight: 700px;">
          <h4>
            <span :class="item.mold == 1? 'income' : 'expend'">
              {{ item.mold == 1? '收入' : '支出' }}
              <i :class="item.mold == 1? 'el-icon-caret-top' : 'el-icon-caret-bottom'"></i>
            </span>
            <span style="margin-right: 20px;"> {{ item.price }}</span>
            <span style="color: #909399;">{{ item.way }}</span>
          </h4>
          <p><span style="color: #409EFF; margin-right: 20px;">{{ item.name }}</span><span style="color: #C0C4CC;">提交于 {{ item.date }}</span></p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: "Main",
  data () {
    return {
      total: '',
      totalIncome: '',
      totalExpend: '',
      netIncome: '',
      priceData: [],
      mainData: []
    }
  },
  methods: {
    async queryCapital() {
      let res = await this.$store.dispatch('queryCapital')
      this.total = res.data.total
    },
    async queryYearMouth() {
      let res = await this.$store.dispatch('queryYearMouth')
      this.totalExpend = res.data.mouthExpend
      let res1 = await this.$store.dispatch('queryYearMouthIncome')
      this.totalIncome = res1.data.mouthIncome
      this.netIncome = this.totalIncome - this.totalExpend
    },
    async queryIncomeExpend() {
      let res = await this.$store.dispatch('queryIncomeExpend')
      this.priceData = res.data
    },
    async queryMainData() {
      var myChart = echarts.init(document.getElementById('chart'));
      myChart.showLoading({text: "数据正在加载..."});
      let res = await this.$store.dispatch('queryMainData');
      this.mainData = res.data
      myChart.hideLoading();
      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          data: ['收入', '支出', '总资金']
        },
        xAxis: [
          {
            type: 'category',
            data: this.mainData.mouth,
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '金额',
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [
          {
            name: '收入',
            type: 'bar',
            data: this.mainData.income
          },
          {
            name: '支出',
            type: 'bar',
            data: this.mainData.expend
          },
          {
            name: '总资金',
            type: 'line',
            data: this.mainData.total
          }
        ]
      });
    }
  },
  mounted() {
    this.queryCapital()
    this.queryYearMouth()
    this.queryIncomeExpend()
    this.queryMainData()
  }
}
</script>

<style scoped>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.bold {
  font-weight: 700;
}

</style>

<style scoped>
.income {
  color: #67C23A;
}
.expend {
  color: #F56C6C;
}
</style>