import { Base } from "../../tests/utils/core"
import Component from "./BaseText.vue"
const base = new Base(Component, {
  // props: {},
})

describe("components/BaseText.vue", () => {
  it("root is of 'tag' prop", async () => {
    const wrapper = base.render({
      props: { tag: 'h1' }
    })

    expect(wrapper.element.tagName.toLowerCase()).toBe('h1')
  })

  it("root has text size class based on size prop", async () => {
    const wrapper = base.render({
      props: { size: 'xl' }
    })

    expect(wrapper.element.classList).toContain('text-xl')
  })

  it("render default slot", () => base.testHasSlot())
})
