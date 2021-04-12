<template>
  <div class="home">
    <el-container>

      <el-aside width="200px">

        <el-menu
            default-active="2"
            class="el-menu-vertical-demo el-aside-menu"
            @open="handleOpen"
            @close="handleClose">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>

      </el-aside>



      <el-container>
        <el-header>

          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">


            <el-menu-item>家庭财务管理系统</el-menu-item>
<!--            <el-submenu index="2">-->
<!--              <template slot="title">我的工作台</template>-->
<!--              <el-menu-item index="2-1">选项1</el-menu-item>-->
<!--              <el-menu-item index="2-2">选项2</el-menu-item>-->
<!--              <el-menu-item index="2-3">选项3</el-menu-item>-->
<!--              <el-submenu index="2-4">-->
<!--                <template slot="title">选项4</template>-->
<!--                <el-menu-item index="2-4-1">选项1</el-menu-item>-->
<!--                <el-menu-item index="2-4-2">选项2</el-menu-item>-->
<!--                <el-menu-item index="2-4-3">选项3</el-menu-item>-->
<!--              </el-submenu>-->
<!--            </el-submenu>-->
<!--            <el-menu-item index="3" disabled>消息中心</el-menu-item>-->



          </el-menu>

        </el-header>

        <el-main>
<!--          <router-view></router-view>-->
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
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped lang="less">
.home {
  * {
    //border: 1px solid red;
  }
  .el-aside-menu {
    position: fixed;
    width: 200px;
    height: 100vh;
  }
}

</style>
