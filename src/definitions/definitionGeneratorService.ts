import { cloneDeep } from "lodash"

interface ServiceOptionLink {
  href: string
}

interface ServiceOptionLinkLocalize extends ServiceOptionLink {
  description: string
  title: string
}

type ServiceOptionLinkLocalizeWithOptionalHref = PartialOptionally<
  ServiceOptionLinkLocalize,
  "href"
>

interface Brand {
  color: string
  onColor: LiteralUnion<"black" | "white">
  name: string
}

interface BrandLocalize extends Partial<Brand> {
  description: string
}

type LinksMap = Map<string | number | symbol, ServiceOptionLinkLocalize>

export class Service<
  Links extends { [key: string]: string },
  LinksKey extends keyof Links = keyof Links
> {
  private readonly brand: Required<BrandLocalize>
  private links: LinksMap

  public readonly id = Symbol()

  constructor(
    private readonly global: {
      brand: Brand
      links: Links
    },
    localize: { brand: BrandLocalize; links?: LinksMap }
  ) {
    this.brand = {
      ...global.brand,
      ...localize.brand,
    }

    this.links = localize.links ?? new Map()
  }

  /**
   * @description Initialize one of links setup in global serviceDefinition
   */
  link(
    run: "initialize",
    key: LinksKey,
    options: ServiceOptionLinkLocalizeWithOptionalHref
  ): this
  /**
   * @description Add new link. Will throw if the key already exists
   */
  link(run: "add", key: string, options: ServiceOptionLinkLocalize): this
  /**
   * @description Remove existing link. Will throw if the key doesn't exist
   */
  link(run: "remove", key: LinksKey): this
  /**
   * @description Remove existing link. Will throw if the key doesn't exist
   */
  link(run: "remove", key: string): this
  /**
   * @description Change existing link. Will throw if the key doesn't exist
   */
  link(
    run: "change",
    key: LinksKey,
    options: Partial<ServiceOptionLinkLocalize>
  ): this
  /**
   * @description Change existing link. Will throw if the key doesn't exist
   */
  link(
    run: "change",
    key: string,
    options: Partial<ServiceOptionLinkLocalize>
  ): this
  /**
   * @description You can add new link, initialize default link, remove or change existing link
   */
  public link(
    run: "initialize" | "add" | "remove" | "change",
    key: string | LinksKey,
    options?: Partial<ServiceOptionLinkLocalize>
  ): this {
    const links = this.links

    switch (run) {
      case "initialize":
        const href = this.global.links[key]
        links.set(key, {
          href,
          ...(options as ServiceOptionLinkLocalizeWithOptionalHref),
        })
        break

      case "add":
        if (links.has(key))
          throw new Error(
            `Name of ${key} already exists on this service. Try running 'change' command instead`
          )
        links.set(key, options as ServiceOptionLinkLocalize)

        break
      case "remove":
        if (!links.has(key))
          throw new Error(`Name of ${key} doesn't exist in links map`)
        links.delete(key)
        break
      case "change":
        const oldLink = links.get(key)
        if (oldLink) links.set(key, { ...oldLink, ...options })
        else
          throw new Error(
            `Name of ${key} doesn't exist in links map. Try running 'add' command instead`
          )
        break
    }
    return this
  }
  /**
   * @description Detach from default instance. Let You define independent version of a service
   * @example service.detach().link('unique', {href: 'YOUR_HREF', description: 'YOUR_DESCRIPTION'})
   */
  detach() {
    return new Service(cloneDeep(this.global), {
      brand: { ...this.brand },
      links: new Map(this.links),
    })
  }

  export() {
    const brand = this.brand
    const links = Array.from(this.links.values())

    return { brand, links }
  }
}

//TODO add way to edit options from code
export const createService = <Links extends { [key: string]: string }>(global: {
  brand: Brand
  links: Links
}) => (localize: { brand: BrandLocalize }) => new Service(global, localize)
