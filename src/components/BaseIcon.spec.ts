import { Base } from "../../tests/utils/core"
import Component from "./BaseIcon.vue"
const base = new Base(Component, {
  props: {
    icon: "link",
  },
})

describe("components/BaseIcon.vue", () => {
  it("render img with svg-inline attribute and src", async () => {
    const wrapper = base.render()
    expect(wrapper.attributes("svg-inline")).toBe("")
    expect(wrapper.attributes("alt")).toBeTruthy()
  })
})
