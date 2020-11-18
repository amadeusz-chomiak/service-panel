import { Service } from "./definitionGeneratorService"

interface CategoryOptions {
  name: string
  description: string
}

export class Category {
  private readonly services = new Map<
    Symbol,
    ReturnType<Service<{}>["export"]>
  >()
  public readonly id = Symbol()
  constructor(private contentOptions: CategoryOptions) {}

  add(instance: Service<{}>) {
    this.services.set(instance.id, instance.export())
    return this
  }

  content(change: Partial<CategoryOptions>) {
    this.contentOptions = { ...this.contentOptions, ...change }
    return this
  }

  export() {
    return {
      ...this.contentOptions,
      services: Array.from(this.services.values()),
    }
  }
}
