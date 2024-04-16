<template>
  <el-menu
    router
    :default-active="activeIndex"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-menu-item
      class="menu-item"
      v-for="menuItem in menuMap"
      :key="menuItem.id"
      :index="menuItem.path"
    >
      <template #title>
        <span>{{ menuItem.title }}</span>
      </template>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { ref } from "vue";
import menu from "../models/menu";
import { RouterLink, useRouter } from "vue-router";

const menuMap = ref(menu);
const router = useRouter();
const activeIndex = ref("/");
const isCollapse = ref(false);

const handleOpen = (key, path) => {
  // router.push(path);
};
</script>

<style scoped>
.menu-item {
  font-size: 1rem;
}
</style>
