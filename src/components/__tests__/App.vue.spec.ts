/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

import { mount, flushPromises } from '@vue/test-utils'
import App from '@/App.vue'

describe('Root App Component', () => {
  beforeEach(() => {
    // tell vitest we use mocked time
    vi.useFakeTimers()
  })

  afterEach(() => {
    // restoring date after each test run
    vi.useRealTimers()
  })

  it('renders properly', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('Today in Ethiopian Calendar is')
    wrapper.unmount()
  })

  it('should show expected dates', async () => {
    const mockIsoDate = '2018-10-17 22:23:56 GMT+0300'

    const date = new Date(mockIsoDate)
    vi.setSystemTime(date)

    const wrapper = mount(App)
    await flushPromises()

    expect(wrapper.text()).toMatch('Tikimt')
    expect(wrapper.text()).toMatch('Tikimt 7, 2011')
    expect(wrapper.text()).toMatch('Wed, 17 Oct 2018 (at GMT+0)')
    expect(wrapper.text()).toMatch('Wednesday, Tikimt 7, 2011')
    wrapper.unmount()
  })
})
