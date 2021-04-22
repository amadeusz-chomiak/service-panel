import { Base } from "../../tests/utils/core"
import Component from "./ButtonToggleColorScheme.vue"
const basicRender = {
  interface: {
    controls: {
      colorScheme: {
        buttonLabel: {
          changeToDarkMode: 'change to dark',
          changeToLightMode: 'change to light'
        }
      }
    }
  }
}

const base = new Base(Component, {
  props: {
    render: basicRender,
  },
})

describe("components/ButtonToggleColorScheme.vue", () => {
  it("has button", async () => {
    const wrapper = base.render()
    const button = wrapper.get("button")
    expect(button.isVisible()).toBe(true)
  })

  it("has aria-label attribute", async () => {
    const wrapper = base.render()
    const button = wrapper.get("button")
    const defaultLabel = button.attributes("aria-label")
    expect(defaultLabel).toBe('change to dark')
    await button.trigger("click")
    const changedLabel = button.attributes("aria-label")
    expect(changedLabel).toBe('change to light')
  })
})
