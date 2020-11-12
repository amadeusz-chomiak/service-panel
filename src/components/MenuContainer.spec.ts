import { Base } from "../../tests/utils/core"
import Component from "./MenuContainer.vue"
const base = new Base(Component, {
  // props: {},
})

describe("components/MenuContainer.vue", () => {
  it("html has async component wrapper", async () => {
    const wrapper = base.render()
    expect(wrapper.html()).toContain("async-component-wrapper-stub")
  })
})
