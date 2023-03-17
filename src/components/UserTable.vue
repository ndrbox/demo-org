<template>
  <el-table 
  :data="store.request" 
  @row-click="onRowClick">
  <el-table-column prop="id" label="Id" />
    <el-table-column prop="name" label="Name"  />
  </el-table>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRequestStore } from "../store/request";
const store = useRequestStore();

const onRowClick = (row, column, event) => {
  store.selectedNode = row.id
  store.onOpenDetail()
}
</script>
