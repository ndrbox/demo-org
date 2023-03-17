<template>
  <el-space  alignment="start" :size="30">

    <el-card shadow="hover" @click="$router.push(`/requests/${request.id}`)" v-for="request in requestsMap" :key="request.key">
      <template #header>
        {{ request.name }}
      </template>
      <div>
        {{ request.date.toLocaleDateString() }}
      </div>
    </el-card>
</el-space>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import requests from "../models/requests";

const requestsMap = ref(requests);
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
</style>
