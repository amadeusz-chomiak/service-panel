import { cloneDeep } from "lodash"
import { Price, PriceOptions } from "./definitionGeneratorPrice"

interface PriceOptionsLocalize extends Partial<PriceOptions> {
  localize: Price
}

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
  private brandOptions: Required<BrandLocalize>
  private linksOptions: LinksMap
  private priceOptions: Required<PriceOptionsLocalize>

  public readonly id = Symbol()

  constructor(
    private readonly global: {
      brand: Brand
      links: Links
      price: PriceOptions
    },
    localize: {
      brand: BrandLocalize
      links?: LinksMap
      price: PriceOptionsLocalize
    }
  ) {
    this.brandOptions = {
      ...global.brand,
      ...localize.brand,
    }

    this.linksOptions = localize.links ?? new Map()

    this.priceOptions = {
      ...global.price,
      ...localize.price,
    }
  }

  /**
   * @description Initialize one of links setup in global serviceDefinition
   */
  links(
    run: "initialize",
    key: LinksKey,
    options: ServiceOptionLinkLocalizeWithOptionalHref
  ): this
  /**
   * @description Add new link. Will throw if the key already exists
   */
  links(run: "add", key: string, options: ServiceOptionLinkLocalize): this
  /**
   * @description Remove existing link. Will throw if the key doesn't exist
   */
  links(run: "remove", key: LinksKey): this
  /**
   * @description Remove existing link. Will throw if the key doesn't exist
   */
  links(run: "remove", key: string): this
  /**
   * @description Change existing link. Will throw if the key doesn't exist
   */
  links(
    run: "change",
    key: LinksKey,
    options: Partial<ServiceOptionLinkLocalize>
  ): this
  /**
   * @description Change existing link. Will throw if the key doesn't exist
   */
  links(
    run: "change",
    key: string,
    options: Partial<ServiceOptionLinkLocalize>
  ): this
  /**
   * @description You can add new link, initialize default link, remove or change existing link
   */
  links(
    run: "initialize" | "add" | "remove" | "change",
    key: string | LinksKey,
    options?: Partial<ServiceOptionLinkLocalize>
  ): this {
    const links = this.linksOptions

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

  brand(change: Partial<BrandLocalize>) {
    this.brandOptions = { ...this.brandOptions, ...change }
    return this
  }

  price(change: Partial<PriceOptionsLocalize>) {
    this.priceOptions = { ...this.priceOptions, ...change }
    return this
  }

  /**
   * @description Detach from default instance. Let You define independent version of a service
   * @example service.detach().link('unique', {href: 'YOUR_HREF', description: 'YOUR_DESCRIPTION'})
   */
  detach() {
    return new Service(cloneDeep(this.global), {
      brand: { ...this.brandOptions },
      links: new Map(this.linksOptions),
      price: { ...this.priceOptions },
    })
  }

  export() {
    const brand = this.brandOptions
    const links = Array.from(this.linksOptions.values())
    const price = this.priceOptions.localize.compose(this.priceOptions)

    return { brand, links, price }
  }
}

//TODO add way to edit options from code
export const createService = <Links extends { [key: string]: string }>(global: {
  brand: Brand
  links: Links
  price: PriceOptions
}) => (localize: { brand: BrandLocalize; price: { localize: Price } }) =>
  new Service(global, localize)
