<template>
  <div class="home">
    <el-container>

      <el-aside width="200px">

        <el-menu
            default-active="1"
            class="el-menu-vertical-demo el-aside-menu"
            @open="handleOpen"
            @close="handleClose">
          <el-menu-item index="1" @click="goMain">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="2" @click="goIncome">
            <i class="el-icon-menu"></i>
            <span slot="title">收入详情</span>
          </el-menu-item>
<!--          <el-submenu index="2">-->
<!--            <template slot="title">-->
<!--              <i class="el-icon-location"></i>-->
<!--              <span>收入详情</span>-->
<!--            </template>-->
<!--            <el-menu-item-group>-->
<!--              <template slot="title">分组一</template>-->
<!--              <el-menu-item index="1-1">选项1</el-menu-item>-->
<!--              <el-menu-item index="1-2">选项2</el-menu-item>-->
<!--            </el-menu-item-group>-->
<!--            <el-menu-item-group title="分组2">-->
<!--              <el-menu-item index="1-3">选项3</el-menu-item>-->
<!--            </el-menu-item-group>-->
<!--            <el-submenu index="1-4">-->
<!--              <template slot="title">选项4</template>-->
<!--              <el-menu-item index="1-4-1">选项1</el-menu-item>-->
<!--            </el-submenu>-->
<!--          </el-submenu>-->
          <el-menu-item index="3" @click="goExpend">
            <i class="el-icon-menu"></i>
            <span slot="title">支出详情</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-menu"></i>
            <span slot="title">报表</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-setting"></i>
            <span slot="title">成员管理</span>
          </el-menu-item>
        </el-menu>

      </el-aside>



      <el-container>
        <el-header>
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item>家庭财务管理系统</el-menu-item>
            <el-submenu style="float: right">
              <template slot="title">用户</template>
              <el-menu-item>账户设置</el-menu-item>
              <el-menu-item>登出</el-menu-item>
            </el-submenu>
            <el-menu-item style="float: right"><el-button @click="goAddOrder" type="text">添加一笔</el-button></el-menu-item>
          </el-menu>
        </el-header>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
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
    goAddOrder() {
      this.$router.push('/addOrder')
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
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
