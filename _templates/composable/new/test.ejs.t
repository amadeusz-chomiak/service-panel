---
to: src/composable/<%= h.changeCase.camel(name) %>.spec.ts
---
import { <%= h.changeCase.camel(name) %> } from "./<%= h.changeCase.camel(name) %>"

describe("composable/<%= h.changeCase.camel(name) %>.ts", () => {
  it("", () => {
    const {} = <%= h.changeCase.camel(name) %>()
  })
})
