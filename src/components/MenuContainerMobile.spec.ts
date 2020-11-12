import { Base } from "../../tests/utils/core"
import Component from "./MenuContainerMobile.vue"
import MenuContainerContent from "./MenuContainerContent.vue"

const base = new Base(Component, {
  // props: {},
})

describe("components/MenuContainerMobile.vue", () => {
  it("render one MenuContainerContent node", async () => {
    const wrapper = base.render()
    expect(wrapper.findAllComponents(MenuContainerContent)).toHaveLength(1)
  })

  it("render one site link node", async () => {
    const wrapper = base.render()
    expect(wrapper.findAll("a")).toHaveLength(1)
  })

  it("hide MenuContainerContent after toggle button click", async () => {
    const wrapper = base.render()
    await wrapper.find("[data-testid='toggle']").trigger("click")
    expect(wrapper.findAllComponents(MenuContainerContent)).toHaveLength(0)
  })
})
