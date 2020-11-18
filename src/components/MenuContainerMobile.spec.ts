import { Base } from "../../tests/utils/core"
import Component from "./MenuContainerMobile.vue"
import MenuContainerContent from "./MenuContainerContent.vue"
import waitFor from "wait-for-expect"
import { Renderer } from "@/definitions/definitionGenerator"
const renderer = new Renderer({
  header: {
    title: "title",
    link: {
      title: "title",
      href: "href",
    },
  },
})
const base = new Base(Component, {
  props: {
    render: renderer.export(),
  },
})

describe("components/MenuContainerMobile.vue", () => {
  it("render one MenuContainerContent node", async () => {
    const wrapper = base.render()
    expect(wrapper.html()).toContain("<menu-container-content")
  })

  it("render one site link node", async () => {
    const wrapper = base.render()
    expect(wrapper.findAll("a")).toHaveLength(1)
  })

  it("hide MenuContainerContent after toggle button click", async () => {
    const wrapper = base.render()
    await wrapper.find("[data-testid='toggle']").trigger("click")
    await waitFor(() =>
      expect(
        wrapper.find("menu-container-content-stub").element
      ).not.toBeVisible()
    )
  })
})
