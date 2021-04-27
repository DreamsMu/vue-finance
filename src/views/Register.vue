<template>
    <div class="register">
        <el-card class="box-card">
            <h1><span>注</span>册</h1>
            <el-form :rules="rulesRegister" label-position="left" :model="registerForm" ref="registerForm" label-width="80px" class="demo-ruleForm">
                <el-form-item
                    label="姓名"
                    prop="name">
                    <el-input type="text" v-model="registerForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item
                    label="用户名"
                    prop="username">
                    <el-input type="text" v-model="registerForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item
                    label="密码"
                    prop="password">
                    <el-input type="password" v-model="registerForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item
                    label="确认密码"
                    prop="checkPass">
                    <el-input type="password" v-model="registerForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item
                    label="家庭ID"
                    prop="family_id">
                    <el-input type="text" v-model="registerForm.family_id" autocomplete="off"></el-input>
                </el-form-item>
                <el-row :gutter="20">
                    <el-col :span="14">
                        <el-form-item
                            label="验证码"
                            prop="code">
                            <el-input type="text" v-model="registerForm.code" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <canvas id="canvas" @click="drawPic(show_num)" width="150" height="40"></canvas>
                    </el-col>
                </el-row>
                <el-form-item>
                    <div class="btnBox">
                        <el-button class="firstBtn" @click="$router.push('/login')">返回登录</el-button>
                        <el-button type="primary" @click="submitForm('registerForm')">注册</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import qs from 'qs'

export default {
    data() {
        var validateCode = (rule, value, callback) => {
            var temp = this.show_num.join('');
            if (!value) return callback(new Error('请输入验证码'));
            if (value.toLowerCase() == temp) return callback();
            callback(new Error('验证码错误'));
        }
        var validatePassword = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入密码'));
            } else {
                if (this.registerForm.checkPass !== '') {
                    this.$refs.registerForm.validateField('checkPass');
                }
                callback();
            }
        }
        var validateCheckPass = (rule, value, callback) => {
            if (!value) return callback(new Error('请再次输入密码'));
            if (value !== this.registerForm.password) {
                callback(new Error('两次输入密码不一致'));
            } else {
                callback();
            }
        }
      return {
        show_num:[],
        registerForm:{
            name: '',
            username: '',
            password: '',
            checkPass: '',
            family_id: '',
            code: ''
        },
        rulesRegister:{
            name:{ required: true, message: '请输入姓名' },
            username:{ required: true, message: '请输入用户名' },
            password:{ required: true, validator: validatePassword, trigger: 'blur' },
            checkPass: { required: true, validator: validateCheckPass, trigger: 'blur' },
            family_id: { required: true, message: '请输入家庭ID'},
            code: { required: true, validator: validateCode, trigger: 'blur' }
        }
      };
    },
    mounted() {
        this.drawPic(this.show_num)
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.registerEvent()
                } else {
                    return false;
                }
            });
        },
        async registerEvent(){
            let res = await this.$store.dispatch('register',qs.stringify(this.registerForm));
            console.log(res.data);
            if (res.data.code1 == 100) {
                if (res.data.code == 200) {
                    this.$router.push('/')
                    this.$message({
                        type: 'success',
                        message: "注册成功，已登陆"
                    })
                    this.$store.state.user = res.data.user
                    sessionStorage.setItem("token", res.data.token)
                    sessionStorage.setItem("user", qs.stringify(res.data.user))
                    this.$router.push('/main')
                } else {
                    this.$message({
                        type: 'error',
                        message: res.data.message
                    })
                }
            } else {
                this.$message({
                    type: 'error',
                    message: res.data.message1
                })
            }
            
        },
        randomNum(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        },
        randomColor(min, max) {
            var r = this.randomNum(min, max);
            var g = this.randomNum(min, max);
            var b = this.randomNum(min, max);
            return "rgb(" + r + "," + g + "," + b + ")";
        },
        drawPic(show_num) {
            var canvas = document.getElementById("canvas");
            var width = canvas.width;
            var height = canvas.height;
            var ctx = canvas.getContext('2d');
            ctx.textBaseline = 'bottom';
            ctx.fillStyle = this.randomColor(280, 280);
            ctx.fillRect(0, 0, width, height);
            var sCode = "A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
            var aCode = sCode.split(",");
            for (var i = 0; i < 4; i++) {
            var txt = aCode[this.randomNum(0, aCode.length)];
            show_num[i] = txt.toLowerCase();
            ctx.fillStyle = this.randomColor(50, 160);
            ctx.font = this.randomNum(15, 40) + 'px SimHei';
            var x = 10 + i * 25;
            var y = this.randomNum(25, 45);
            var deg = this.randomNum(-45, 45);
            ctx.translate(x, y);
            ctx.rotate(deg * Math.PI / 180);
            ctx.fillText(txt, 0, 0);
            ctx.rotate(-deg * Math.PI / 180);
            ctx.translate(-x, -y);
            }
        }
    }
}
</script>

<style scoped lang="less">
.register {
    height: 96vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.box-card {
    width: 480px;
    h1 {
        text-align: center; margin-bottom: 30px;
        span {
            margin-right: 20px;
        }
    }
    .btnBox {
        text-align: center;
        transform:translate(-11%,0);
        .firstBtn {
            margin-right:10px;
        }
    }
    #canvas {
        border-top: 1px solid #DCDFE6;
        border-bottom: 1px solid #DCDFE6;
        cursor: pointer;
    }
}
</style>