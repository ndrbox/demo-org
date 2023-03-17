<template>
  <div class="chart">
    <ContextMenu v-show="state.showContext" />
    <!-- <h1>Users</h1> -->
    <div
      @contextmenu.prevent="onOpenNodeContextMenu"
      @click="state.showContext = false"
      id="tree"
      ref="tree"
    ></div>
  </div>
</template>

<script setup>
// import { OrgChart } from "d3-org-chart";
import { ref, onMounted, reactive } from "vue";
// import users from "../models/users";
import ContextMenu from "@/components/ContextMenu.vue";
import { useRequestStore } from "../store/request";

const store = useRequestStore();

const tree = ref(null);
const state = reactive({ showContext: false });

const onOpenNodeContextMenu = (event, node) => {
  const foreignObject = event.target.closest(".node-foreign-object-div");
  if (!foreignObject) {
    state.showContext = false;
    return;
  }
  store.setCoordinates(foreignObject);
  state.showContext = true;
};

function initTransformObserver() {
  const chart = tree.value.querySelector(".chart");
  const observer = new MutationObserver(() => (state.showContext = false));
  observer.observe(chart, {
    attributes: true,
    attributeFilter: ["transform"],
  });
}

onMounted(() => {
  store.initChart(tree.value);
  initTransformObserver();
});
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

#tree {
  min-height: 200px;
}

.node-content {
  /* width: 100px; */
  height: 20px;
}
</style>
