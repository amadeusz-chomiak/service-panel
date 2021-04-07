import { shallowMount } from "@vue/test-utils"
import { MountingOptions as MountingOptionsDefinition } from "@vue/test-utils/dist/types"
import { h, Component, defineComponent } from "vue"

type Select = (wrapper: Wrapper) => Wrapper | never
const randomNumber = () => Math.round(Math.random() * 1000)
const testText = () => `__test-nr-${randomNumber()}__`
const testTag = () => {
  const text = testText()
  return {
    component: h("div", text),
    text,
  }
}

type MountingComponent = Parameters<typeof shallowMount>[0]
type Wrapper = ReturnType<typeof shallowMount>
const selectRoot: Select = wrapper => wrapper

export class Base<
  C extends Component<Props>,
  MountingOptions extends MountingOptionsDefinition<Props>,
  MountingOptionsOrProps extends MountingOptions | { props: Partial<Props> },
  Props
> {
  constructor(
    protected readonly Component: C,
    protected options?: MountingOptions
  ) {}

  render(additionalOptions?: MountingOptionsOrProps): Wrapper {
    const wrapper = shallowMount(this.Component as MountingComponent, {
      ...this.options,
      ...(additionalOptions as MountingOptions),
    }) as Wrapper

    return wrapper
  }

  /**
   * Will always throw rendered HTML
   * @param additionalOptions
   */
  debug(additionalOptions?: MountingOptionsOrProps) {
    expect(this.render(additionalOptions).html()).toBe(undefined)
  }
  // ? tests
  /**
   * Test if slot exists and is visible
   */
  testHasSlot(slotName = "default") {
    const { component, text } = testTag()
    const wrapper = this.render(
      //@ts-expect-error
      {
        slots: {
          [slotName]: component,
        },
      }
    )

    expect(wrapper.html()).toContain(text)
  }

  /**
   * Test if scoped slot receive object with property of specific value
   * @param slotName
   * @param expectedKey
   * @param expectedValue You can provide only a part of expected value
   */
  testHasScopedSlot(
    slotName: LiteralUnion<"default"> = "default",
    expectedKey: string,
    expectedValue?: unknown
  ) {
    const wrapper = this.render(
      //@ts-expect-error
      {
        slots: {
          [slotName]: {
            render(props: any) {
              return <scoped-slot-test>{props[expectedKey]}</scoped-slot-test>
            },
          },
        },
      }
    )
   
    const ScopedSlotComponent = wrapper.find("scoped-slot-test")
    expect(ScopedSlotComponent.text()).toBeTruthy()
    if (expectedValue)
      expect(ScopedSlotComponent.text()).toContain(expectedValue)
  }

  /**
   * Test if firing event on component chosen by your query
   * will end up with event emitted to parent component
   */
  async testEmitter(
    select: Select = selectRoot,
    eventName: LiteralUnion<"click" | "input"> = "click",
    emitName: string = eventName
  ) {
    const wrapper = this.render()
    const EventSource = select(wrapper)
    await EventSource.trigger(eventName)
    expect(wrapper.emitted()[emitName]).toBeTruthy()
  }

  /**
   * Test if your query return visible element, let You easily override props
   */
  testPropInline(select: Select = selectRoot, propsOverload?: Partial<Props>) {
    const wrapper = propsOverload
      ? //@ts-expect-error
        this.render({ props: propsOverload })
      : this.render()
    const PropTarget = select(wrapper)
    expect(PropTarget.exists()).toBe(true)
  }

  /**
   * Test if your query return visible element
   */
  testHtmlVisibility(
    select: Select = selectRoot,
    optionsOverload?: MountingOptionsOrProps
  ) {
    const wrapper = this.render(optionsOverload)
    expect(select(wrapper).exists()).toBe(true)
  }

  /**
   * Test if your query return element with correct name tag
   */
  testHtmlTag(
    select: Select = selectRoot,
    tag: LiteralUnion<"button" | "p" | "span" | "div">,
    optionsOverload?: MountingOptionsOrProps
  ) {
    const wrapper = this.render(optionsOverload)
    expect(select(wrapper).element.tagName.toLowerCase()).toBe(
      tag.toLowerCase()
    )
  }
}
