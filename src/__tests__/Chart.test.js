import { mount } from '@vue/test-utils'
import Chart from '../components/Chart.vue'
import { setActivePinia, createPinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'

let wrapper

describe('chart', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    wrapper = mount(Chart,
      {
        global: {
          plugins: [createTestingPinia()],
        }
      }
    )
  })

  test('отображает компонент', () => {
    expect(wrapper).toBeDefined()
  })

  test('отображает svg', () => {
    expect(wrapper.html()).toContain(`<svg class="svg-chart-container"`)  })
})