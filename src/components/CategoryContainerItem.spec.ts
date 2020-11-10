import { Base } from "../../tests/utils/core"
import Component from "./CategoryContainerItem.vue"
import { Category } from "@/composable/useDefinitions"
const base = new Base(Component, {
  props: {
    category: {
      name: "name",
      description: "description",
      services: [{}, {}]
    } as Category,
  },
})

describe("components/CategoryContainerItem.vue", () => {
  it("render category title", () => {
    const wrapper = base.render()
    const header = wrapper.get("h2")
    expect(header.text()).toContain("name")
  })
  it("render title with category name as an id", () => {
    const wrapper = base.render()
    const header = wrapper.get("#name")
    expect(header.isVisible()).toBe(true)
  })
  it("render category description", () => {
    const wrapper = base.render()
    const header = wrapper.get("h2")
    expect(header.text()).toContain("description")
  })
  it("render service cards", () => {
    const wrapper = base.render()
    //? search for two opening tags for category-container-item component
    expect(wrapper.findAll("service-card-stub")?.length).toBe(2)
  })
})
