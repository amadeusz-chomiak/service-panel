import { Base } from "../../tests/utils/core"
import Component from "./TransitionFade.vue"
const base = new Base(Component, {
  // props: {},
})

describe("components/TransitionFade.vue", () => {
  it("render default slot", async () => base.testHasSlot())
})
