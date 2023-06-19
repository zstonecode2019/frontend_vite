<template>
    <div>
        page {{ url }} not found 404!!!
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
let url = route.query.page
</script>

<style lang="scss" scoped></style>
