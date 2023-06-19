<template>
  <div class="login">
    <div class="login-title">登录界面</div>
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
      <el-form-item label="用户名:" prop="username">
        <el-input v-model="ruleForm.username" type="text" placeholder="请输入账号" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input v-model="ruleForm.password" type="password" placeholder="请输入密码" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router'
import api from '@/api'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus';

const ruleFormRef = ref<FormInstance>()
const router = useRouter()

const userStore = useUserStore()

const validateUsername = (rule: any, value: any, callback: any) => {
  console.log(rule);
  if (value === '') {
    callback(new Error('请输入账号!'))
  } else {
    callback()
  }
}
const validatePass = (rule: any, value: any, callback: any) => {
  console.log(rule);
  if (value === '') {
    callback(new Error('请输入密码!'))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  username: '',
  password: '',
})

const rules = reactive<FormRules>({
  username: [{ validator: validateUsername, trigger: 'blur' }],
  password: [{ validator: validatePass, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      let rs = await api.login(ruleForm.username, ruleForm.password);
      if (rs.code == 200 && rs.data) {
        userStore.setUser({ name: rs.data.name, nickname: rs.data.nickname });
        // 登录成功
        router.push({ path: '/' });
      } else {
        ElMessage.error(rs.data);
      }
    } else {
      ElMessage.error('账号或密码验证错误!');
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
<style lang="scss" scoped>
.login {
  width: 800px;
  height: 600px;
  margin: 0 auto;
  background-color: lightblue;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 8px;
  box-shadow: #409EFF 0 0 10px;

  &-title {
    color: #409EFF;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
  }
}
</style>
