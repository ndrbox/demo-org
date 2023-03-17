<template>
  <div
    class="context-menu el-dropdown__list"
    :style="{
      left: store.contextMenu.left + 'px',
      top: store.contextMenu.top + 'px',
    }"
  >
  <div class="">

    <el-button @click="store.onOpenDetail">Edit</el-button>
  </div>
  <div>


    <el-button @click="create">Add new</el-button>
  </div>

    <div>

    <el-button @click="remove">Delete</el-button>
  </div>

    <el-dialog v-model="dialogVisible" title="Add new employee" width="30%">
      <span>employee</span>
      <UserDetail ></UserDetail>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="createConfirm"> Confirm </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import user from "../models/user";
import { useRequestStore } from "../store/request";
import UserDetail from "./UserDetail.vue";

const store = useRequestStore();

const newUser = ref(user);

const name = ref("");
const dialogVisible = ref(false);

const create = () => {
  dialogVisible.value = true;
};

const remove = () => {
  store.removeNode();
};

const createConfirm = () => {
  const user = {
    id: String(Math.random()),
    name: name,
    parentId: store.selectedNode,
  };
  store.addNode(user);
  dialogVisible.value = false;
};
</script>
<style scoped>
.context-menu {
  position: absolute;
  z-index: 999;
  flex-direction: column;
  display: flex;
  /* margin: 4px; */
}

.context-menu div {
  margin-left: 4px;
  margin-bottom: 4px;
}
</style>
