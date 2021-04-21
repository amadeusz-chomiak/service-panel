import { Base } from "../../tests/utils/core"
import View from "./Main.vue"
const base = new Base(View)
describe("views/Main.vue", () => {

  it("has a skip to main content link", () => {
    const wrapper = base.render()
    const skipToContentLink = wrapper.get('[href="#main-content"]')
    expect(skipToContentLink.text()).toBeTruthy()
  })
})