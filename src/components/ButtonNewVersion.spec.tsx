import { Base } from "../../tests/utils/core"
import Component from "./ButtonNewVersion.vue"
import BaseTooltip from "./BaseTooltip.vue"
import { useVersionControl } from "@/composable/useVersionControl"
import { useDefinitions } from "@/composable/useDefinitions"
const idMock = "test-id"

const base = new Base(Component)

describe("components/ButtonNewVersion.vue", () => {
  it("set base-tooltip right prop to false by default", async () => {
    const wrapper = base.render()

    const tooltip = wrapper.get("base-tooltip")
    expect(tooltip.attributes("right")).toBe("false")
  })

  it("pass tooltip-right prop as base-tooltip right prop", async () => {
    const wrapper = base.render({
      props: {
        tooltipRight: true,
      },
    })

    const tooltip = wrapper.get("base-tooltip")
    expect(tooltip.attributes("right")).toBe("true")
  })

  it("can be clicked only once", async () => {
    const wrapper = base.render()
    const button = wrapper.get("button")
    const { setSkipWaiting } = useVersionControl()
    const fn = jest.fn()
    setSkipWaiting(fn)

    await button.trigger("click")
    await button.trigger("click")
    await button.trigger("click")

    expect(fn).toBeCalledTimes(1)
  })

  it("has tooltip text from useDefinition", () => {
    const wrapper = base.render({
      props: {
        tooltipRight: true,
      },
    })
    const { render } = useDefinitions()
    const tooltipText = render.value.interface.controls.versionControl.tooltip
    const tooltip = wrapper.get("base-tooltip")
    expect(tooltip.attributes("text")).toBe(tooltipText)
  })

  it("button has aria-labelledby set from scoped slot id parameter", () => {
    const wrapper = base.render()
    const button = wrapper.get("button")
    expect(button.attributes("aria-labelledby")).toBe(idMock)
  })
})
