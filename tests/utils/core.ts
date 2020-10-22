import {
  render,
  fireEvent,
  RenderOptions,
  ComponentHarness,
  VueFireObject,
} from '@testing-library/vue'
type LiteralUnion<T extends U, U = string> = T | (U & never)

interface Temp<V extends Vue> {
  testName?: string
  renderer?: ComponentHarness
}

type select = (renderer: ComponentHarness) => HTMLElement | never
type selectReturn = ReturnType<select>
type selectWithQuery<T extends string> = (
  renderer: ComponentHarness,
  query: T
) => selectReturn

const testText = '__testText__'
const testTag = `<div>${testText}</div>`

/**
 * Performs a deep merge of `source` into `target`.
 * Mutates `target` only but not its objects and arrays.
 */
function mergeDeep(
  target: { [key: string]: any },
  source: { [key: string]: any }
) {
  const isObject = (obj: object) => obj && typeof obj === 'object'

  if (!isObject(target) || !isObject(source)) {
    return source
  }

  Object.keys(source).forEach((key) => {
    const targetValue = target[key]
    const sourceValue = source[key]

    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      target[key] = targetValue.concat(sourceValue)
    } else if (isObject(targetValue) && isObject(sourceValue)) {
      target[key] = mergeDeep(Object.assign({}, targetValue), sourceValue)
    } else {
      target[key] = sourceValue
    }
  })

  return target
}

export class Base<V extends Vue> {
  protected temp: Temp<V> = {}
  constructor(
    //@ts-expect-error
    protected readonly Component: VueClass<V>,
    protected options: RenderOptions<V> = {}
  ) {}

  render(additionalOptions: RenderOptions<V> = {}) {
    const renderer = render(
      this.Component,
      mergeDeep(
        {
          stubs: ['nuxt-link'],
          ...this.options,
        },
        additionalOptions
      )
    )
    this.temp.renderer = renderer
    return renderer
  }

  clear() {
    this.temp = {}
  }

  selectRoot(renderer?: ComponentHarness) {
    const bestRenderer = renderer ?? this.temp.renderer
    if (!bestRenderer) throw new Error('no renderer awaitable')
    const firstElementChild = bestRenderer.container.firstElementChild
    if (firstElementChild) return firstElementChild as HTMLElement
    throw new Error('no root container with first child found')
  }

  // ? tests
  /**
   * Test if slot exists and is visible
   */
  testHasSlot(slotName = 'default') {
    const { getByText } = this.render({
      slots: {
        [slotName]: testTag,
      },
    })

    const Slot = getByText(testText)
    expect(Slot).toBeVisible()
    this.clear()
  }

  /**
   * Test if firing event on component chosen by your query
   * will end up with event emitted to parent component
   */
  async testEmitter(
    select: select = this.selectRoot,
    eventName: keyof VueFireObject = 'click',
    emitName: string = eventName
  ) {
    const renderer = this.render()
    const EventSource = select(renderer)

    await fireEvent[eventName](EventSource)
    expect(renderer.emitted()[emitName]).toBeTruthy()
    this.clear()
  }

  /**
   * Test if root element is of desired html tag
   */
  testRootTag(tag: string, propsOverload?: object) {
    const renderer = propsOverload
      ? this.render({ props: propsOverload })
      : this.render()
    const Root = this.selectRoot(renderer)

    expect(Root.tagName.toLowerCase()).toBe(tag.toLowerCase())
    this.clear()
  }

  /**
   * Test if your query return visible element, let You easily override props
   */
  testPropInline(select: select, propsOverload?: object) {
    const renderer = propsOverload
      ? this.render({ props: propsOverload })
      : this.render()
    const PropTarget = select(renderer)
    expect(PropTarget).toBeVisible()
    this.clear()
  }

  /**
   * Test if your query return visible element
   */
  testHtmlVisibility(select: select, optionsOverload: RenderOptions<V> = {}) {
    const renderer = this.render(optionsOverload)
    expect(select(renderer)).toBeVisible()
    this.clear()
  }

  /**
   * Test if your query return element with correct name tag
   */
  testHtmlTag(
    select: select,
    tag: LiteralUnion<'button' | 'p' | 'span' | 'div'>,
    optionsOverload: RenderOptions<V> = {}
  ) {
    const renderer = this.render(optionsOverload)
    expect(select(renderer).tagName.toLowerCase()).toBe(tag.toLowerCase())
    this.clear()
  }
}
