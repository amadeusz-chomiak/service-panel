import { computed } from "vue"
import { Renderer } from "@/definitions/definitionGenerators"
import * as category from "@/definitions/en/categoryDefinitions"
import * as service from "@/definitions/en/serviceDefinitions"

export const useDefinitions = () => {
  const renderer = new Renderer()

  renderer.add(category.contentEditor.add(service.sanity))
  renderer.add(
    category.analytic
      .add(service.plausible)
      .add(
        service.firebase
          .detach()
          .link("add", "analytics", {
            title: "analytics",
            description: "analytics",
            href: "test",
          })
      )
  )
  renderer.add(category.server.add(service.firebase))

  return {
    render: computed(() => renderer.export()),
  }
}

export type Render = ReturnType<typeof useDefinitions>["render"]["value"]
export type Category = Render[number]
export type Service = Category["services"][number]
