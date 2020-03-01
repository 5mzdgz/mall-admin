<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <!-- <el-form-item prop="username">
                    <el-select v-model="param.userType" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="请输入用户名">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="请输入密码"
                        v-model="param.password"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="comfrimPassword" v-if="resigeter">
                    <el-input
                        type="password"
                        placeholder="确认密码"
                        v-model="param.comfrimPassword"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">{{resigeter?'注册':'登录'}}</el-button>
                </div>
                <!-- <div class="login-tips">
                    <span>忘记密码</span>
                    <span class="resigeter" @click="resigeter = !resigeter">{{resigeter?'登录':'注册'}}</span>
                </div> -->
            </el-form>
        </div>
    </div>
</template>

<script>
import { resigeterData, loginData } from '@/api/index';
import CryptoJS from 'crypto-js';
import md5 from 'js-md5';
export default {
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.param.comfrimPassword !== '') {
                    this.$refs.login.validateField('comfrimPassword');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.param.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            resigeter: false,
            param: {
                username: '',
                password: '',
                comfrimPassword: '',
                userType: 4,
                loginResgsiterPassword: ''
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ validator: validatePass, trigger: 'blur' }],
                comfrimPassword: [{ validator: validatePass2, trigger: 'blur' }]
            },
            options: [
                {
                    value: 3,
                    label: '用户'
                },
                {
                    value: 4,
                    label: '超级管理员'
                },
                {
                    value: 5,
                    label: '管理者'
                },
                {
                    value: 6,
                    label: '运营者'
                }
            ]
        };
    },
    methods: {
        jiaMi(message) {
            var aseKey = 'ggweijie2020wuye'; //秘钥
            //加密
            var encrypt = CryptoJS.AES.encrypt(message, CryptoJS.enc.Utf8.parse(aseKey), {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            }).toString();
            // console.log(encrypt);
            return encrypt;
            //解密
            // var decrypt = CryptoJS.AES.decrypt(encrypt, CryptoJS.enc.Utf8.parse(aseKey), {
            //     mode: CryptoJS.mode.ECB,
            //     padding: CryptoJS.pad.Pkcs7
            // }).toString(CryptoJS.enc.Utf8);
            // console.log(decrypt);
        },
        submitForm() {
            this.$refs.login.validate(valid => {
                if (valid) {
                    // const password = this.jiaMi(this.param.password);
                    console.log(this.param.password)
                    const password = md5(this.param.password).toUpperCase();
                    this.param.loginResgsiterPassword = password;
                    if (this.resigeter) {
                        resigeterData(this.param).then(res => {
                            console.log(res);
                            if (res.code === 200) {
                                this.$message.success('注册成功');
                                this.resigeter = false;
                            }
                        });
                    } else {
                        console.log(this.param)
                        loginData(this.param).then(res => {
                            console.log(res);
                            if (res.code === 200) {
                                sessionStorage.setItem('token', res.token)
                                this.$store.dispatch('token', res.token);
                                this.$router.push('/');
                            }
                        })
                    }
                } else {
                    this.$message.error('请输入账号和密码');
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpg);
    background-size: 100%;
}
.el-select {
    width: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
    width: 100%;
}
.resigeter {
    float: right;
}
</style>