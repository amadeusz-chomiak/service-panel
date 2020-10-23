---
to: src/components/<%= h.changeCase.pascal(name) %>.spec.ts
---
import { Base } from "../../tests/utils/core"
import Component from "./<%= h.changeCase.pascal(name) %>.vue"
const base = new Base(Component, {
  // props: {},
})

describe("components/<%= h.changeCase.pascal(name) %>.vue", () => {
  it("", async () => {
    const wrapper = base.render()
  })
})