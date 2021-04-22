import { Category } from "./definitionGeneratorCategory"
interface RendererInterfaceOptions {
  header: {
    title: string
    link: {
      title: string
      href: string
    }
    skipToMain: {
      title: string
    }
  }
  controls: {
    title: string
    versionControl: {
      tooltip: string
    }
    navigation: {
      buttonLabel: string
    }
    colorScheme: {
      buttonLabel: {
        changeToLightMode: string
        changeToDarkMode: string
      }
    }
  }
}
export class Renderer {
  private readonly categories = new Map<
    Symbol,
    ReturnType<Category["export"]>
  >()
  constructor(private readonly interfaceOptions: RendererInterfaceOptions) {}

  add(instance: Category) {
    this.categories.set(instance.id, instance.export())
    return this
  }

  export() {
    return {
      interface: this.interfaceOptions,
      categories: Array.from(this.categories.values()),
    }
  }
}
