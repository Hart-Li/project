<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form">
          <h1>Hello</h1>
          <h2>欢迎来到后台管理系统</h2>
          <el-form-item>
            <el-input
              v-model="loginForm.username"
              :prefix-icon="User"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              type="password"
              v-model="loginForm.password"
              show-password
              :prefix-icon="Lock"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loginBtnLoading"
              class="login_btn"
              @click="userLogin"
              round
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user'
import { getTimeIntervalStr } from '@/utils/time'
import { Lock, User } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

let loginBtnLoading = ref(false)
let loginForm = reactive({ username: 'admin', password: '111111' })
function userLogin() {
  loginBtnLoading.value = true
  userStore
    .userLogin({
      username: loginForm.username,
      password: loginForm.password,
    })
    .then(() => {
      loginBtnLoading.value = false
      router.push({ path: '/' })
      const timeIntervalStr = getTimeIntervalStr()
      ElNotification({
        title: 'HI, ' + timeIntervalStr,
        message: '欢迎回来',
        type: 'success',
      })
    })
    .catch((error) => {
      loginBtnLoading.value = false
      ElNotification({
        title: '登录失败',
        message: error.message,
        type: 'error',
      })
    })
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    padding: 40px;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;

    h1 {
      font-size: 40px;
      font-weight: 700;
      color: white;
    }
    h2 {
      font-size: 20px;
      font-weight: 400;
      color: white;
      margin: 20px 0;
    }
    .login_btn {
      width: 100%;
    }
  }
}
</style>
