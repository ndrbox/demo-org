<template>
  <el-table 
  :data="users" 
  @row-click="onRowClick">
  <el-table-column prop="id" label="Id" />
    <el-table-column v-for="field in fields" :key="field.id" :prop="field.desc" :label="field.title"  />
  </el-table>
</template>

<script setup>
import { computed } from 'vue'
import { useRequestStore } from "../store/request";
import { fields } from "../models/fields";
const store = useRequestStore();

const users = computed(() => {
  return store.request.map(user=>{
    const row = {id:user.id}
    user?.fields?.forEach(field=>row[field.desc]=field.value)
    return row
  })
})

const onRowClick = (row, column, event) => {
  store.selectedNode = row.id
  store.onOpenDetail()
}
</script>
