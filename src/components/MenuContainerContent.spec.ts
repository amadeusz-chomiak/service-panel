import { Base } from "../../tests/utils/core"
import Component from "./MenuContainerContent.vue"
const basicRender = [
  {
    name: "category0",
    description: "description",
    services: [],
  },
  {
    name: "category1",
    description: "description",
    services: [],
  },
]

const base = new Base(Component, {
  props: { 
    render: basicRender
  },
})

describe("components/MenuContainerContent.vue", () => {
  it("render all category's title from 'render' prop", async () => {
    const wrapper = base.render()
    const Links = wrapper.findAll('a')
    expect(Links).toHaveLength(2)
    expect(Links[0].text()).toBe('category0')
    expect(Links[1].text()).toBe('category1')
  })

  it("render link with href of hashed category name", async () => {
    const wrapper = base.render()
    const Links = wrapper.findAll('a')
    expect(Links[0].attributes('href')).toBe('#category0')
  })
}) 