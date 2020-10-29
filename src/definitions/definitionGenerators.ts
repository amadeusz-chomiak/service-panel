import { cloneDeep } from "lodash"

interface ServiceOptionLink {
  description: string
  href: string
}

interface ServiceOptions<Links extends string> {
  brand: {
    color: string
    onColor: LiteralUnion<"black" | "white">
    name: string
    description: string
  }
  links: Map<LiteralUnion<Links>, ServiceOptionLink>
}

//todo add way to edit options from code
export class Service<Links extends string = string> {
  constructor(private readonly options: ServiceOptions<Links>) {}
  public readonly id = Symbol()

  /**
   * @description Add new or change link, that will be rendered in service the card
   */
  link(name: Links, options: Partial<ServiceOptionLink>): this
  link(name: string, options: ServiceOptionLink): this
  link(name: LiteralUnion<Links>, options: Partial<ServiceOptionLink>) {
    const links = this.options.links

    const oldLink = links.get(name)
    if (oldLink) links.set(name, { ...oldLink, ...options })

    if (options.description && options.href)
      links.set(name, options as ServiceOptionLink)

    return this
  }
  /**
   * @description Detach from default instance. Let You define independent version of a service
   * @example service.detach().link('unique', {href: 'YOUR_HREF', description: 'YOUR_DESCRIPTION'})
   */
  detach() {
    return new Service(cloneDeep(this.options))
  }

  export() {
    const options = this.options
    const links = Array.from(options.links.entries()).map(([name, value]) => ({
      name,
      ...value,
    }))
    return { ...options, links }
  }
}

interface CategoryOptions {
  name: string
  description: string
}

export class Category {
  private readonly services = new Map<Symbol, ReturnType<Service["export"]>>()
  public readonly id = Symbol()
  constructor(private readonly options: CategoryOptions) {}

  add(instance: Service) {
    this.services.set(instance.id, instance.export())
    return this
  }

  export() {
    return {
      ...this.options,
      services: Array.from(this.services.values()),
    }
  }
}

export class Renderer {
  private readonly categories = new Map<
    Symbol,
    ReturnType<Category["export"]>
  >()

  add(instance: Category) {
    this.categories.set(instance.id, instance.export())
    return this
  }

  export() {
    return Array.from(this.categories.values())
  }
}
