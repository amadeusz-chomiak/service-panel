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
const props = {
  render: basicRender,
  focusTargetsId: {
    lastLink: "link-id",
    toggleButton: "toggle-id",
  },
}
const base = new Base(Component, {
  props,
})

describe("components/MenuContainerContent.vue", () => {
  it("render all category's title from 'render' prop", async () => {
    const wrapper = base.render()
    const Links = wrapper.findAll("a")
    expect(Links).toHaveLength(2)
    expect(Links[0].text()).toBe("category0")
    expect(Links[1].text()).toBe("category1")
  })

  it("render link with href of hashed category name", async () => {
    const wrapper = base.render()
    const Links = wrapper.findAll("a")
    expect(Links[0].attributes("href")).toBe("#category0")
  })

  describe("focus trap", () => {
    it("set id of the last link to focusTargetsId.lastLink prop value", () => {
      const wrapper = base.render()
      const links = wrapper.findAll("a")
      const lastLink = links.pop()
      links.forEach(link => {
        expect(link.attributes("id")).not.toBe(props.focusTargetsId.lastLink)
      })
      expect(lastLink!.attributes("id")).toBe(props.focusTargetsId.lastLink)
    })
    //TODO add puppeteer test for mobile navigation keyboard usage
  })
})
