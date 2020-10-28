import { Base } from "../../tests/utils/core"
import Component from "./CategoryContainer.vue"
const basicRender = [
  {
    name: "category",
    description: "description",
    services: [],
  },
  {
    name: "category",
    description: "description",
    services: [],
  },
]

const base = new Base(Component, {
  props: {
    render: basicRender,
  },
})

describe("components/CategoryContainer.vue", () => {
  it("render CategoryContainerItem components from 'render' prop", async () => {
    const wrapper = base.render()
    //? search for two opening tags for category-container-item component
    expect(wrapper.findAll('category-container-item-stub')?.length).toBe(2)
  })
})
