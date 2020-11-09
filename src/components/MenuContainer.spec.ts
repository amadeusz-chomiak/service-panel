import { Base } from "../../tests/utils/core"
import Component from "./MenuContainer.vue"
import MenuContainerContent from "./MenuContainerContent.vue"
const base = new Base(Component, {
  // props: {},
})

describe("components/MenuContainer.vue", () => {
  it("render only one MenuContainerContent node", async () => {
    const wrapper = base.render()
    expect(wrapper.findComponent(MenuContainerContent).exists()).toBe(true)
  })
})
