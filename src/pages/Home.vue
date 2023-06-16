<template>
    <div class="layout">
        <el-row>
            <el-col :span="24">
                <div class="layout-header">
                    <div>用户名：{{ userStore.nickname }}</div>
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
const userStore = useUserStore()
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
        background-color: #409EFF;
    }

    .layout-sider {
        height: calc(100vh - 60px);
        background-color: #67C23A;
    }

    .layout-content {
        height: calc(100vh - 60px);
        background-color: #E6A23C;
    }
}
</style>
  