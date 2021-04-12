<template>
  <div>
    <el-page-header @back="goBack" content="添加一笔"></el-page-header>
    <el-tabs v-model="activeName" @tab-click="handleClick" type="card" style="margin-top: 20px">
      <el-tab-pane label="收入" name="first">
        <el-row>
          <el-col :span="12">
            <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
<!--              <el-form-item label="姓名">-->
<!--                <el-input v-model="sizeForm.name"></el-input>-->
<!--              </el-form-item>-->
              <el-form-item label="金额">
                <el-col :span="11">
                  <el-input v-model="sizeForm.name"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="活动时间">
                <el-col :span="11">
                  <el-date-picker type="date" placeholder="选择日期" v-model="sizeForm.date1" style="width: 100%;"></el-date-picker>
                </el-col>
              </el-form-item>
              <el-form-item size="large">
                <el-button type="primary" @click="onSubmit">完成</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="支出" name="second">配置管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "AddOrder",
  data() {
    return {
      activeName: 'first',
      sizeForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<style scoped>

</style>
