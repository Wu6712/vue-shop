<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="图片加载失败">
      </div>
      <!-- 登录表单区域 -->
      <el-form label-width="0px"
               class="login_form"
               :model="loginForm"
               :rules="loginFormRules"
               ref="loginFormRef">
        <!--        用户名-->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <!--        密码-->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" show-password></el-input>
        </el-form-item>
        <!--        按钮-->
        <el-row class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      // 登录表单的数据绑定
      loginForm: {
        username: '',
        password: ''
      },
      // 表单验证规则对象
      loginFormRules: {
        // 验证用户名
        username: [
          {required: true, message: '请输入登录名称', trigger: 'blur'},
          {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
        ],
        // 验证密码
        password: [
          {required: true, message: '请输入登录密码', trigger: 'blur'},
          {min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    // 点击重置按钮
    resetLoginForm(formName) {
      this.$refs.loginFormRef.resetFields();
    },
    // 登录
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return;
        const {data: result} = await this.$http.post('login', this.loginForm)
        if (result.meta.status !== 200) return this.$message.error('登录失败')
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        // 使用临时缓存保存token
        window.sessionStorage.setItem("token", result.data.token)
        // 页面跳转
        this.$router.push("/home");
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  height: 100%;
  background-color: #2b4b6b
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}

.btns {
  display: flex;
  justify-content: flex-end;
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>