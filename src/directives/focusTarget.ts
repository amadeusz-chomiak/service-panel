import { Directive, DirectiveHook, VNode } from "vue"

const RemoveEventHandler = Symbol("focus target remove event handler")
// todo change to a puppeteer test mostly

interface HTMLElementWithRemoveEventHandler extends HTMLElement {
  [RemoveEventHandler]: () => void
}

interface BindingValue {
  query: string
  enable: boolean
}

const setupFocusTarget: DirectiveHook<
  HTMLElementWithRemoveEventHandler,
  null | VNode,
  BindingValue
> = (element, binding) => {
  const { query, enable = true } = binding.value
  //? check if query is provided
  if (query === undefined)
    throw new Error(
      `v-focus-target: You need to provide query selector that points to the target.`
    )

  const forth = binding.arg === "back" ? false : true
  const eventHandler = (event: KeyboardEvent) => {
    if (
      //? check if it wasn't disabled
      enable &&
      //? check if user use tab to navigate to the next element
      event.key === "Tab" &&
      //? if set to focus target when going forth user intent has to be to go forth (by not holding shift key)
      //? if set to focus target when going back user intent has to be to go back (by holding shift key)
      forth !== event.shiftKey
    ) {
      event.preventDefault()
      const target = document.querySelector(query) as HTMLElement
      if (target) target.focus()
      else
        console.warn(
          "v-focus-target",
          "target of query",
          query,
          "does not exist!"
        )
    }
  }
  //? bind remove event listener method to element
  const removeEventListener = () => {
    element.removeEventListener("keydown", eventHandler)
  }

  element[RemoveEventHandler]?.()
  element.addEventListener("keydown", eventHandler)

  element[RemoveEventHandler] = removeEventListener
}

export const FocusTargetDirective: Directive<
  HTMLElementWithRemoveEventHandler,
  BindingValue
> = {
  mounted: setupFocusTarget,
  beforeUpdate: setupFocusTarget,
  beforeUnmount(element) {
    element[RemoveEventHandler]?.()
  },
}
