import { Base } from "../../tests/utils/core"
import Component from "./MenuContainerDesktop.vue"
import MenuContainerContent from "./MenuContainerContent.vue"

const base = new Base(Component, {
  // props: {},
})

describe("components/MenuContainerDesktop.vue", () => {
  it("render one MenuContainerContent node", async () => {
    const wrapper = base.render()
    expect(wrapper.findAllComponents(MenuContainerContent)).toHaveLength(1)
  })

  it("render one site link node", async () => {
    const wrapper = base.render()
    expect(wrapper.findAll("a")).toHaveLength(1)
  })
})