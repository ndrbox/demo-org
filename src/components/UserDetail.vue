<template>
  <div v-if="store.node">
    <h3>{{ store.node.name }}</h3>
    <div class="node-detail-field" v-for="field in store.node.fields">
      <span class="node-detail-field-title">{{ field.title }}</span>
      <el-input v-model="field.value" :type="field.type" :placeholder="field.title" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useNodeStore } from "../store/node";

const store = useNodeStore();

</script>
