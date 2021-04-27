<template>
    <div v-loading.fullscreen.lock="fullscreenLoading">
        <el-col :span="12">
            <el-form :rules="rulesUser" label-position="left" ref="userForm" :model="userForm" label-width="100px" class="demo-ruleForm">
                <el-form-item
                    label="姓名"
                    prop="name">
                    <el-input type="text" v-model="userForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item
                    label="用户名"
                    prop="username">
                    <el-input type="text" v-model="userForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item
                    label="密码"
                    prop="password">
                    <el-input type="text" v-model="userForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item
                    v-if="false"
                    label="家庭总资金"
                    prop="total">
                    <el-input type="number" v-model="userForm.total" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item
                    v-if="$store.state.user.power == '1'? true:false"
                    label="欠款"
                    prop="debt">
                    <el-input type="number" v-model="userForm.debt" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item
                    label="家庭ID">
                    <el-input type="text" disabled v-model="userForm.family_id" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :loading="loading" @click="submitForm('userForm')">修改</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </div>
</template>

<script>
import qs from 'qs'
export default {
    name: "UserSet",
    data() {
        return {
            loading: false,
            fullscreenLoading: false,
            userForm:{
                id: '',
                name: '',
                username: '',
                password: '',
                power: '',
                total: '',
                debt: '',
                family_id: ''
            },
            rulesUser:{
                name: { required: true, message: '请输入姓名' },
                username:{ required: true, message: '请输入用户名' },
                password:{ required: true, message: '请输入密码'}
            }
        }
    },
    methods: {
        async getUserId() {
            let res = await this.$store.dispatch('queryUserId', qs.stringify({id:this.$store.state.user.id, family_id:this.$store.state.user.family_id}))
            this.userForm = res.data[0]
        },
        async submitEvent() {
            if (this.userForm.total == '') this.userForm.total = 0
            if (this.userForm.debt == '') this.userForm.debt = 0
            let res = await this.$store.dispatch('updateUserSet', qs.stringify(this.userForm))
            if (res.data.code == 200) {
                this.$message({
                    type: 'success',
                    message: "已修改"
                })
                this.$store.state.user = res.data.user
                sessionStorage.setItem("user",qs.stringify(res.data.user))
                this.loading = false
                this.getUserId()
            } else if (res.data.code == 222) {
                this.$message({
                    type: 'error',
                    message: "用户名已存在"
                })
                this.loading = false
            } else {
                this.$message({
                    type: 'error',
                    message: "数据错误，请修改后重试"
                })
                this.loading = false
            }
        },
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loading = true
                    this.submitEvent()
                } else {
                    return false;
                }
            });
        }
    },
    created() {
        this.getUserId()
    }
}
</script>
