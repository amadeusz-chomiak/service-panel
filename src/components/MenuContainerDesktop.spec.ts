import { Base } from "../../tests/utils/core"
import Component from "./MenuContainerDesktop.vue"
import MenuContainerContent from "./MenuContainerContent.vue"
import { Renderer } from "@/definitions/definitionGenerator"

const props: ConstructorParameters<typeof Renderer>[0] = {
  header: {
    title: "title",
    link: {
      title: "title",
      href: "href",
    },
   
    skipToMain: {
      title: 'Skip to main content'
    }
  },
  controls: {
    title: "controls",
    versionControl: {
      tooltip: "tooltip",
    },
    colorScheme: {
      buttonLabel: { changeToDarkMode: "dark", changeToLightMode: "light" },
    },
    navigation: {
      buttonLabel: 'navigation menu'
    }
  }
}

const renderer = new Renderer(props)
const base = new Base(Component, {
  props: {
    render: renderer.export(),
  },
})

describe("components/MenuContainerDesktop.vue", () => {
  it("render one MenuContainerContent node", async () => {
    const wrapper = base.render()
    expect(wrapper.findAllComponents(MenuContainerContent)).toHaveLength(1)
  })

  describe("controls section", () => {
    it("render h2 title with value from the controls.title", () => {
      const wrapper = base.render()
      const section = wrapper.find('section')
      const heading = section.find('h2')
      expect(heading.html()).toContain(props.controls.title)
    })
  })

  describe("header", () => {
    it("render one header node", async () => {
      const wrapper = base.render()
      expect(wrapper.findAll("header")).toHaveLength(1)
    })

    describe("link to the website", () => {
      it("render one site link node inside of the header", async () => {
        const wrapper = base.render()
        const header = wrapper.find("header")
        const links = header.findAll("a")
        expect(links).toHaveLength(1)
      })

      it("render one link with href of header.link.href prop", async () => {
        const wrapper = base.render()
        const header = wrapper.find("header")
        const link = header.find("a")
        expect(link.attributes("href")).toBe(props.header.link.href)
      })

      it("render one link with innerHTML of header.link.title prop", async () => {
        const wrapper = base.render()
        const header = wrapper.find("header")
        const link = header.find("a")
        expect(link.html()).toContain(props.header.link.title)
      })
    })

    it("render h1 title inside of the header", async () => {
      const wrapper = base.render()
      const header = wrapper.find("header")
      const heading = header.find("h1")
      expect(heading.html()).toContain(props.header.title)
    })
  })
})
