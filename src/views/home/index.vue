<template>
  <div>
    <el-card>
      <div class="header-content">
        <el-avatar
          :size="150"
          :src="userStore.avatar"
          style="margin: 0 20px"
        ></el-avatar>
        <div class="user-text">
          <p class="first-line">
            {{ getTimeIntervalStr() }}，{{ userStore.username }}
          </p>
          <p class="second-line">欢迎来到后台管理系统</p>
        </div>
      </div>
    </el-card>
    <div class="main-content">
      <SvgIcon name="welcome" width="500px" height="500px" />
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon/index.vue'
import useUserStore from '@/store/modules/user'
import { getTimeIntervalStr } from '@/utils/time'
import { onMounted } from 'vue'

const userStore = useUserStore()
onMounted(() => {
  userStore.getUserInfo()
})
</script>

<style scoped>
.header-content {
  display: flex;
  align-items: center;
  .first-line {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 30px;
  }
  .second-line {
    font-size: 20px;
    font-style: italic;
    color: #999;
  }
}

.main-content {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
