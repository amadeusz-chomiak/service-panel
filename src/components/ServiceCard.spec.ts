import { Base } from "../../tests/utils/core"
import Component from "./ServiceCard.vue"
import { createService, Price } from "@/definitions/definitionGenerator"

const price = new Price({
  cost: {
    free: "free",
    paid: "paid",
    flexible: 'flexible'
  },
  renew: {
    never: "never",
    onDemand: "onDemand",
    daily: "daily",
    weekly: "weekly",
    monthly: "monthly",
    quarterly: "quarterly",
    yearly: "yearly",
  },
  compose({ renew, cost }) {
    if (renew) return renew + " " + cost
    return cost
  },
})

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
  price: {
    cost: "paid",
    renew: "monthly",
  },
})({
  brand: {
    description: "description",
  },
  price: {
    localize: price,
  },
})
  .links("initialize", "link", {
    description: "link-description",
    title: "link",
  })
  .links("initialize", "link-second", {
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
  it('render price', () => {
    const wrapper = base.render()
    expect(wrapper.get('[data-testid="price"]').text()).toBe('monthly paid')
  })
})
