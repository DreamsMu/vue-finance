<template>
  <div>
    <div id="line" style="height: 400px; margin-bottom: 40px;"></div>
    <el-row :gutter="20">
      <el-col :span="12">
        <div id="incomePie" style="height: 400px; margin-bottom: 40px;"></div>
      </el-col>
      <el-col :span="12">
        <div id="expendPie" style="height: 400px; margin-bottom: 40px;"></div>
      </el-col>
    </el-row>
    <div id="bar" style="height: 400px"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: "Chart",
  data () {
    return {
      year: '',
      incomeWayData: [],
      expendPayWayData: [],
      expendWayData: {},
      mainData: [],
      activeClass: ''
    }
  },
  methods: {
    async getIncomeWay() {
      var incomePie = echarts.init(document.getElementById('incomePie'));
      incomePie.showLoading({text: "数据正在加载..."});
      let res = await this.$store.dispatch('queryIncomeWay');
      this.incomeWayData = res.data
      incomePie.hideLoading();
      incomePie.setOption({
        title: {
          text: '收入途径'
        },
        legend: {
          top: 'bottom'
        },
        toolbox: {
          show: true,
          feature: {
            mark: {show: true}
          }
        },
        series: [
          {
            name: '面积模式',
            type: 'pie',
            radius: [50, 150],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            data: this.incomeWayData
          }
        ]
      });
    },
    async getExpendPayWay() {
      var expendPie = echarts.init(document.getElementById('expendPie'));
      expendPie.showLoading({text: "数据正在加载..."});
      let res = await this.$store.dispatch('queryExpendPayway');
      this.expendPayWayData = res.data
      expendPie.hideLoading();
      expendPie.setOption({
        title: {
          text: '支出方式'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: this.expendPayWayData
          }
        ]
      });
    },
    async getExpendWay() {
      var bar = echarts.init(document.getElementById('bar'));
      bar.showLoading({text: "数据正在加载..."});
      let res = await this.$store.dispatch('queryExpendWay');
      this.expendWayData = res.data
      bar.hideLoading();
      bar.setOption({
        title: {
          text: '支出用途'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: this.expendWayData.name
        },
        series: [
          {
            type: 'bar',
            data: this.expendWayData.value
          }
        ]
      });
    },
    async queryMainData() {
      var line = echarts.init(document.getElementById('line'));
      line.showLoading({text: "数据正在加载..."});
      let res = await this.$store.dispatch('queryMainData');
      this.mainData = res.data
      line.hideLoading();
      line.setOption({
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
    this.getIncomeWay()
    this.getExpendPayWay()
    this.getExpendWay()
    this.queryMainData()
  }
}
</script>