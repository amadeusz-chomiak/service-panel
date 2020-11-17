import { Base } from "../../tests/utils/core"
import Component from "./ServiceCard.vue"
import { createService } from "@/definitions/definitionGenerator"
const baseService = createService({
  brand: {
    name: "name",
    color: "#000",
    onColor: "white",
  },
  links: {
    link: "link-href",
    "link-second": "link-second-href",
  },
})({
  brand: {
    description: "description",
  },
})
  .link("initialize", "link", {
    description: "link-description",
    title: "link",
  })
  .link("initialize", "link-second", {
    description: "link-second-description",
    title: "link-second",
  })
  .export() 

const base = new Base(Component, {
  props: {
    service: baseService,
  },
})

describe("components/ServiceCard.vue", () => {
  it("render service title", () => {
    const wrapper = base.render()
    const header = wrapper.get('[data-testid="title"]')
    expect(header.text()).toContain("name")
  })
  it("render service description", () => {
    const wrapper = base.render()
    const description = wrapper.get('[data-testid="description"]')
    expect(description.text()).toContain("description")
  })
  it("render ServiceCardLink components", async () => {
    const wrapper = base.render()
    //? search for two opening tags for category-container-item component
    expect(wrapper.findAll("service-card-link-stub")?.length).toBe(2)
  })
})
