const contextButton = `
<button class="tree-context-button el-button" onclick="this.dispatchEvent(new Event('contextmenu', { 'bubbles': true }));event.stopPropagation()">
  actions
</button>
`

const getFieldByTitle = (fields, title) => {
  return fields?.find(field => field.title == title)?.value
}

const nodeFields = (fields) => {
  return fields?.map(field => `
  <div class="node-item">
    <div class="node-item-title">
      ${field.title}
    </div>
    <div class="mode-item-value">
      ${field.value}
    </div>
  </div>
  `).join('')
}

export const getHtmlNode = (data) => (
  `
  <div class="tree-chart-node drag el-card">
    <div class="el-card__header">
      <h3>
        ${getFieldByTitle(data.data.fields, 'name')}
      </h3>
      ${contextButton}
    </div>
    <div class="el-card__body">
      <div class="node-list">
        ${nodeFields(data.data.fields)}
      </div>
    </div>
  </div>
  `
)
