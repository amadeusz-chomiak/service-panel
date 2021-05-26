import { Category } from "./definitionGeneratorCategory"
import {merge} from 'lodash'
export interface RendererInterfaceOptions {
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
  constructor(private interfaceOptions: RendererInterfaceOptions) {}

  /**
   * Add a new Category to the renderer. It'll be rendered in the user interface
   * @param instance of the Category class
   */
  add(instance: Category) {
    this.categories.set(instance.id, instance.export())
    return this
  }

  /**
   * Change any value on the interface object
   * @param change Interface Options
   */
  interface(change: DeepPartial<RendererInterfaceOptions>) {
    this.interfaceOptions = merge(this.interfaceOptions, change)
    return this
  }

  export() {
    return {
      interface: this.interfaceOptions,
      categories: Array.from(this.categories.values()),
    }
  }
}
