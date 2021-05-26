import { Base } from "../../tests/utils/core"
import Component from "./ServiceCardLink.vue"
import { useDefinitions } from '@/composable/useDefinitions'
const { render } = useDefinitions()
const composeAriaLabel = render.value.interface.services.serviceLink.composeAriaLabel
const props = {
  link: {
    title: "title",
    href: "href",
    description: "description",
  },
  brand: {
    color: "#fff",
    onColor: "#fff",
    name: "name"
  },
}
const base = new Base(Component, {
  props
})

describe("components/ServiceCardLink.vue", () => {
  it("render 'a' tag with title and href", async () => {
    const wrapper = base.render()
    const link = wrapper.get('[target="_blank"]')
    expect(link.text()).toContain("title")
    expect(link.attributes().href).toBe("href")
  })

  it("render 'a' tag with aria-label set to brand name and button title", () => {
    const wrapper = base.render()
    const link = wrapper.get('[target="_blank"]')
    expect(link.attributes()['aria-label']).toBe(composeAriaLabel(props.brand.name, props.link.title))
  })

  it('render "a" tag with brand colors', async () => {
    const wrapper = base.render()
    const element = wrapper.get('[target="_blank"]').element as HTMLLinkElement
    expect(element.style.backgroundColor).toBe("rgb(255, 255, 255)")
  })

  it("has brand background style on the container", async () => {
    const wrapper = base.render()
    expect((wrapper.element as HTMLElement).style.backgroundColor).toBe(
      "rgb(255, 255, 255)"
    )
  })

  it("render link icon", () => {
    const wrapper = base.render()
    const baseIcon = wrapper.get("base-icon")
    expect(baseIcon.attributes().icon).toBe("link")
  })

  it("render link description", () => {
    const wrapper = base.render()
    const description = wrapper.get('[data-testid="description"]')
    expect(description.text()).toBe("description")
  })

  it("connect link with the description with aria-describedby attribute", () => {
    const wrapper = base.render()
    const description = wrapper.get('[data-testid="description"]')
    const link = wrapper.get('[target="_blank"]')
    expect(description.attributes("id")).toBeTruthy()
    expect(link.attributes("aria-describedby")).toBe(
      description.attributes("id")
    )
  })
})
