import { Base } from "../../tests/utils/core"
import Component from "./ServiceCardLink.vue"
const base = new Base(Component, {
  props: {
    link: {
      name: "name",
      href: "href",
      description: "description",
    },
    brand: {
      color: "#fff",
      onColor: "#fff"
    }
  },
})

describe("components/ServiceCardLink.vue", () => {
  it("render a tag with name and href", async () => {
    const wrapper = base.render()
    const link = wrapper.get('[target="_blank"]')
    expect(link.text()).toContain('name')
    expect(link.attributes().href).toBe('href')
  })

  it('render a tag with brand colors', () => {
    const wrapper = base.render()
    const element = wrapper.get('[target="_blank"]').element as HTMLLinkElement
    expect(element.style.color).toBe('rgb(255, 255, 255)')
    expect(element.style.background).toBe('rgb(255, 255, 255)')
  })
})
