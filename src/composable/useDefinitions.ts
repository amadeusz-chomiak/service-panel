import { computed, onBeforeMount, ref } from "vue"
import { Renderer } from "@/definitions/definitionGenerator"
import * as category from "@/definitions/en/categoryDefinitions"
import * as service from "@/definitions/en/serviceDefinitions"

const renderer = new Renderer({
  header: {
    //? change title from .env file in the root of the project
    title: process.env.VUE_APP_SHORT_NAME || 'services',
    link: {
      title: "amadeo.dev",
      href: "https://amadeo.dev",
    },
    versionControl: {
      tooltip: 'switch to new version'
    }
  },
})

renderer.add(category.contentEditor.add(service.sanity))
renderer.add(
  category.analytic.add(service.plausible).add(
    service.firebase.detach().links("add", "analytics", {
      title: "analytics",
      description: "analytics",
      href: "test",
    })
  )
)
renderer.add(category.server.add(service.firebase))
renderer.add(
  category.development.add(
    service.developer
      .links("add", "email", {
        title: "send",
        description: "send email to me at help@amadeo.dev",
        href: "mailto:help@amadeo.dev",
      })
      .brand({ name: "Amadeusz Chomiak" })
  )
)

export const useDefinitions = () => {
  return {
    render: computed(() => renderer.export()), //? is computed if You need to get it as JSON from api
  }
}

export type Render = ReturnType<Renderer["export"]>
export type Category = Render["categories"][number]
export type Service = Category["services"][number]
