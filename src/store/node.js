import { ref } from "vue";
import { defineStore } from 'pinia'
import users from '../models/users'



export const useNodeStore = defineStore('node', () => {
  const node = ref(null)
  // const 

  function getNode(id) {
    node.value = users.find(user => user.id == id);
  };

  return { node, getNode }
})