<template>
    <div class="layout">
        <el-row>
            <el-col :span="24">
                <div class="layout-header">
                    <div class="layout-header-username">用户名：{{ userStore.nickname }}</div>
                    <div class="layout-header-logout">
                        <el-button type="primary" @click="logout">退出登录</el-button>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="3">
                <div class="layout-sider"></div>
            </el-col>
            <el-col :span="21">
                <div class="layout-content"></div>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { onMounted } from 'vue'
import api from '@/api'
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'

const userStore = useUserStore()
const router = useRouter()

onMounted(() => {
    api.getUserList().then(rs => {
        console.log(rs);
    })
})
const logout = () => {
    ElMessageBox.confirm(
        '是否确定退出该账户?',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            userStore.logout();
            router.push({ path: '/login' });
        })
        .catch(() => {

        })

}
</script>

<style lang="scss">
.layout {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .layout-header {
        height: 60px;
        line-height: 60px;
        // background-color: #409EFF;
        display: flex;
        justify-content: space-between;

        &-username {
            margin-left: 20px;
        }

        &-logout {
            margin-right: 20px;
        }
    }

    .layout-sider {
        height: calc(100vh - 60px);
        // background-color: #67C23A;
    }

    .layout-content {
        height: calc(100vh - 60px);
    }
}
</style>
  