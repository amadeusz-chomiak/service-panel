import { Base } from "../../tests/utils/core"
import Component from "./ButtonToggleColorScheme.vue"
const base = new Base(Component, {
  // props: {},
})

describe("components/ButtonToggleColorScheme.vue", () => {
  it("has button", async () => {
    const wrapper = base.render()
    const button = wrapper.get('button')
    expect(button.isVisible()).toBe(true)
  })
})