<script setup>
import { RouterView } from "vue-router";
import Menu from "./components/Menu.vue";
import { Menu as menuIcon } from "@element-plus/icons-vue";
import { ref } from "vue";

const menuDrawer = ref(false);
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-drawer
        size="200"
        direction="ltr"
        v-model="menuDrawer"
        class="hidden-sm-and-up menu-drawer"
      >
        <Menu />
      </el-drawer>
      <el-aside width="200px" class="hidden-xs-only">
        <Menu />
      </el-aside>
      <el-container>
        <el-main>
          <el-button
            class="hidden-sm-and-up menu-button"
            @click="menuDrawer = !menuDrawer"
            :icon="menuIcon"
            circle
          />
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
:global(.menu-drawer .el-drawer__body) {
  padding: 0 !important;
}

.menu-button {
  top: 8px;
  right: 8px;
  position: absolute;
  z-index: 1;
}
</style>
