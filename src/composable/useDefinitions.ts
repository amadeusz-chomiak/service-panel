import { computed } from "vue"
import { Renderer } from "@/definitions/definitionGenerators"
import * as category from "@/definitions/en/categoryDefinitions"
import * as service from "@/definitions/en/serviceDefinitions"

export const useDefinitions = () => {
  const renderer = new Renderer()

  return {
    render: computed(() => renderer.export()),
  }
}
