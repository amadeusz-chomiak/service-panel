import { FocusTargetDirective } from "./focusTarget"
import TestComponent from "./FocusTarget__TestComponent.vue"
import { Base } from "../../tests/utils/core"
const base = new Base(TestComponent, {
  global: { directives: { "focus-target": FocusTargetDirective } },
})
const enum Id {
  simpleActivator = "#test-id-1",
  simpleReceiver = "#test-id-2",
  notEnableActivator = "#test-id-3",
  notEnableReceiver = "#test-id-4",
  backWrongReceiver = "#test-id-5",
  backActivator = "#test-id-6",
  backReceiver = "#test-id-7",
}

describe("directives/focusTarget", () => {
  it("mounted method binds 'keydown' event listener to the element", async () => {
    const wrapper = base.render()
    let spyFocus: jest.SpyInstance
    const spyQuerySelector = jest
      .spyOn(document, "querySelector")
      .mockImplementation((selector: string) => {
        const el = wrapper.find(selector).element as HTMLElement
        spyFocus = jest.spyOn(el, "focus")
        return el
      })
    const activatorElement = wrapper.find(Id.simpleActivator)
    const el = activatorElement.element as HTMLElement
    el.focus()
    await activatorElement.trigger("keydown", { key: "Tab" })
    expect(spyFocus!).toBeCalledTimes(1)
    expect(spyQuerySelector).toBeCalledWith(Id.simpleReceiver)
  })

  it("prevent moving focus to target, when 'enable' is false", async () => {
    const wrapper = base.render()
    let spyFocus: jest.SpyInstance
    //? will call it only if all conditions are met
    jest
      .spyOn(document, "querySelector")
      .mockImplementation((selector: string) => {
        const el = wrapper.find(selector).element as HTMLElement
        spyFocus = jest.spyOn(el, "focus")
        return el
      })
    const activatorElement = wrapper.find(Id.notEnableActivator)
    const el = activatorElement.element as HTMLElement
    el.focus()
    await activatorElement.trigger("keydown", { key: "Tab" })
    expect(spyFocus!).toBe(undefined)
  })

  it("when argument is set to back, move focus to target only on tab + shift", async () => {
    const wrapper = base.render()
    let spyFocus: jest.SpyInstance
    //? will call it only if all conditions are met
    const spyQuerySelector = jest
      .spyOn(document, "querySelector")
      .mockImplementation((selector: string) => {
        const el = wrapper.find(selector).element as HTMLElement
        spyFocus = jest.spyOn(el, "focus")
        return el
      })
    const activatorElement = wrapper.find(Id.backActivator)
    const el = activatorElement.element as HTMLElement
    el.focus()
    await activatorElement.trigger("keydown", { key: "Tab" })
    expect(spyFocus!).toBe(undefined)

    el.focus()
    await activatorElement.trigger("keydown", { key: "Tab", shiftKey: true })
    expect(spyFocus!).toBeCalledTimes(1)
    expect(spyQuerySelector).toBeCalledWith(Id.backReceiver)
  })
})
