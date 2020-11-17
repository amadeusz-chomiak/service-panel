import { computed, onBeforeMount } from "vue"
import { Renderer } from "@/definitions/definitionGenerator"
import * as category from "@/definitions/pl/categoryDefinitions"
import * as service from "@/definitions/pl/serviceDefinitions"

export const useDefinitions = () => {
  const renderer = new Renderer()
  onBeforeMount(() => {
    renderer.add(category.contentEditor.add(service.sanity))
    renderer.add(
      category.analytic.add(service.plausible).add(
        service.firebase.detach().link("add", "analytics", {
          title: "analytics",
          description: "analytics",
          href: "test",
        })
      )
    )
    renderer.add(category.server.add(service.firebase))
    renderer.add(
      category.development.add(
        service.developer.link("add", "email", {
          title: "napisz",
          description: "wyślij do mnie e-mail na pomoc@amadeusz.dev",
          href: "mailto:pomoc@amadeusz.dev",
        })
      )
    )
  })

  return {
    render: computed(() => renderer.export()),
  }
}

export type Render = ReturnType<typeof useDefinitions>["render"]["value"]
export type Category = Render[number]
export type Service = Category["services"][number]
