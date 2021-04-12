<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>家庭总金额</span>
          </div>
          <div>
            23,424,321
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>当月支出</span>
          </div>
          <div>
            4,321
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>总欠款</span>
          </div>
          <div>
            4,321
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>下月应还</span>
          </div>
          <div>
            4,321
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-col :span="24">
        <div id="chart" style="height: 400px"></div>
      </el-col>
    </el-row>

    <el-table
        :data="tableData"
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
          label="方式">
      </el-table-column>
      <el-table-column
          prop="way"
          label="操作">
        <el-button type="primary" icon="el-icon-edit" circle></el-button>
        <el-button type="danger" icon="el-icon-delete" circle></el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "Expend",
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        price: 324,
        way: '股票'
      },{
        date: '2016-05-02',
        name: '王小虎',
        price: 324,
        way: '股票'
      },{
        date: '2016-05-02',
        name: '王小虎',
        price: 324,
        way: '股票'
      },{
        date: '2016-05-02',
        name: '王小虎',
        price: 324,
        way: '股票'
      },{
        date: '2016-05-02',
        name: '王小虎',
        price: 324,
        way: '股票'
      },{
        date: '2016-05-02',
        name: '王小虎',
        price: 324,
        way: '股票'
      }]
    }
  },
  mounted() {
    var myChart = echarts.init(document.getElementById('chart'));
    // 绘制图表
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
      toolbox: {
        feature: {
          dataView: {show: true, readOnly: false},
          magicType: {show: true, type: ['line', 'bar']},
          restore: {show: true},
          saveAsImage: {show: true}
        }
      },
      legend: {
        data: ['蒸发量', '降水量', '平均温度']
      },
      xAxis: [
        {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '水量',
          min: 0,
          max: 250,
          interval: 50,
          axisLabel: {
            formatter: '{value} ml'
          }
        },
        {
          type: 'value',
          name: '温度',
          min: 0,
          max: 25,
          interval: 5,
          axisLabel: {
            formatter: '{value} °C'
          }
        }
      ],
      series: [
        {
          name: '蒸发量',
          type: 'bar',
          data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        },
        {
          name: '降水量',
          type: 'bar',
          data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
        },
        {
          name: '平均温度',
          type: 'line',
          yAxisIndex: 1,
          data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
        }
      ]
    });
  }
}
</script>

<style scoped>

</style>
