import { ref, computed } from "vue";
import { getRequestData } from "../utils/requestUtils";
import { OrgChart } from "d3-org-chart";
import { defineStore } from 'pinia'
import { getHtmlNode } from "../components/treeNode";
import * as d3 from "d3";
import { useNodeStore } from "../store/node";





export const useRequestStore = defineStore('request', () => {
  const request = ref([])
  const chart = ref(null)
  const selectedNode = ref('');
  const detail = ref(false);
  const contextMenu = ref({ top: 0, left: 0 });
  // const targetNode = ref(null);
  let targetNode = null

  const nodeStore = useNodeStore();




  function getRequest() {
    request.value = getRequestData();
  }

  function initChart(tree) {
    getRequest();

    chart.value = new OrgChart();

    chart.value.update = function ({ x0, y0, x = 0, y = 0, width, height }) {
      OrgChart.prototype.update.call(this, { x0, y0, x, y, width, height });
      const nodes = this.getChartState().nodesWrapper
        .selectAll("g.node")

      nodes
        .on("mouseover", (event, node) => {
          targetNode = node;
        })
        .on("mouseOut", (event) => {
          targetNode = null;
        })
        .on("contextmenu", (event, node) => {
          selectedNode.value = node.id
        })
      nodes.call(dragcontainer)
    }


    chart.value
      .container(tree)
      .data(request.value)
      .nodeHeight((d) => 326)
      .setActiveNodeCentered(false)
      .compact(false)
      .nodeContent((node) => getHtmlNode(node))
      .render();

    chart.value.onNodeClick((nodeId) => {
      selectedNode.value = nodeId;
      onOpenDetail()
    });

  };

  const transferNode = (childNode, parentNode) => {
    childNode.data.parentId = parentNode.id;
  }

  const dragcontainer = d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended)

  function dragstarted(event) {

    const transform = this.computedStyleMap().get('transform')[0]
    this.x = transform.x.value;
    this.y = transform.y.value;

    this.start = true;

  }

  function dragged(event) {
    this.setAttribute("pointer-events", 'none');
    this.x += event.dx;
    this.y += event.dy;

    this.start = false;
    this.setAttribute('transform', `translate(${this.x},${this.y})`)

  }

  function dragended(event, node) {

    if (this.start) {
      return
    }

    this.x = 0;
    this.y = 0;

    this.removeAttribute("pointer-events")

    if (node.data.parentId && node.id != targetNode.id) {
      transferNode(node, targetNode)
      node.data._expanded = true;    
    }

    chart.value.render();
  }



  const setCoordinates = (foreignObject) => {
    const { top: topTree, left: leftTree } = tree.getBoundingClientRect();
    const { right: nodeRight, top: nodeTop } = foreignObject.getBoundingClientRect();

    contextMenu.value.left = nodeRight - leftTree;
    contextMenu.value.top = nodeTop - topTree
  };

  function removeNode() {
    request.value = request.value.filter(el => el.id == selectedNode.value);
    chart.value.removeNode(selectedNode.value);
    onCloseDetail()
  }

  function addNode(node) {
    request.value.push(node);
    chart.value.render();
  }

  function onOpenDetail() {
    detail.value = true;
    nodeStore.getNode(selectedNode.value)

  }

  function onCloseDetail() {
    detail.value = false;
  }

  function resetSelectedNode() {
    selectedNode.value = '';
    chart.value.render();
    onCloseDetail()
  }

  const chartUpdate = () => {
    // chart.value.update();
    chart.value.render();
  }

  return {
    request, initChart, selectedNode, getRequest, resetSelectedNode, detail,
    chartUpdate,
    onOpenDetail, onCloseDetail,
    addNode, removeNode,
    setCoordinates, contextMenu
  }
})