<template>
  <div>
    <h2>Structure 1</h2>
    <el-drawer size="300" v-model="store.detail" class="detail-drawer">
      <UserDetail :user="user"/>
      <el-button @click="onSaveNode">Save</el-button>
    </el-drawer>
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="Chart" name="first">
        <Chart> </Chart>
      </el-tab-pane>
      <el-tab-pane label="Table" name="second">
        <UserTable />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import Chart from "../components/Chart.vue";
import UserTable from "../components/UserTable.vue";
import { useRequestStore } from "../store/request";
import UserDetail from "../components/UserDetail.vue";

const activeName = ref("first");
const store = useRequestStore();

onMounted(() => {
  store.getRequest();
});

const onSaveNode = () => {
  store.chartUpdate();
  store.resetSelectedNode();
}
</script>
