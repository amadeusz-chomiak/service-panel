import { merge } from "lodash"
import { PriceOptions, PriceOptionsLocalizeBasic, PriceOptionsLocalize  } from "./definitionGeneratorPrice"

interface ServiceOptionLink {
  href: string
}

interface ServiceOptionLinkLocalize extends Partial<ServiceOptionLink> {
  description: string
  title: string
}

interface Brand {
  color: string
  onColor: LiteralUnion<"black" | "white">
  name: string
}

interface BrandLocalize extends Partial<Brand> {
  description: string
}

type LinksHandler<Links> = (helpers: {
  initialize: (
    key: Links,
    changes?: Partial<ServiceOptionLinkLocalize>
  ) => Required<ServiceOptionLinkLocalize>
  initializeAll: () => Required<ServiceOptionLinkLocalize>[]
}) => Required<ServiceOptionLinkLocalize>[]

export class Service<
  LinksDefinitionKey extends string,
  LinksDefinition extends {
    [key in LinksDefinitionKey]: Required<ServiceOptionLinkLocalize>
  } = {
    [key in LinksDefinitionKey]: Required<ServiceOptionLinkLocalize>
  }
> {
  private brandDefinition: Required<BrandLocalize>
  private linksDefinition: LinksDefinition
  private priceDefinition: PriceOptionsLocalize
  private linksValue: ServiceOptionLinkLocalize[] = []

  public readonly id = Symbol()

  constructor(
    private readonly options: {
      brand: Required<BrandLocalize>
      price: Required<PriceOptionsLocalize>
      links: LinksDefinition
    }
  ) {
    this.brandDefinition = options.brand
    this.linksDefinition = options.links
    this.priceDefinition = options.price
  }

  links(handler: LinksHandler<LinksDefinitionKey>) {
    const initialize = (
      key: LinksDefinitionKey,
      changes?: Partial<ServiceOptionLinkLocalize>
    ) => {
      const link = this.linksDefinition[key]
      if (!link) {
        const availableKeys = Object.keys(this.linksDefinition).join(", ")
        throw new Error(
          `Name of ${key} doesn't exist in default links map. You can chose from [${availableKeys}]`
        )
      }

      if (changes) {
        if (changes.title) link.title = changes.title
        if (changes.description) link.description = changes.description
        if (changes.href) link.href = changes.href
      }
      return link
    }

    const initializeAll = () => {
      return Object.values(this.linksDefinition) as Required<
        ServiceOptionLinkLocalize
      >[]
    }

    this.linksValue = handler({ initialize, initializeAll })
    return this
  }

  brand(change: Partial<BrandLocalize>) {
    this.brandDefinition = { ...this.brandDefinition, ...change }
    return this
  }

  price(change: Partial<PriceOptionsLocalize>) {
    this.priceDefinition = { ...this.priceDefinition, ...change } as PriceOptionsLocalize
    return this
  }

  export() {
    const brand = this.brandDefinition
    const links = this.linksValue
    const price = this.priceDefinition.localize.compose(this.priceDefinition)

    return { brand, links, price }
  }
}

export const createService = <
  LinksDefinitionKey extends string,
  LinksDefinition extends {
    [key in LinksDefinitionKey]: ServiceOptionLink
  } = {
    [key in LinksDefinitionKey]: ServiceOptionLink
  },
  LocalizedLinksDefinition extends {
    [key in LinksDefinitionKey]: ServiceOptionLinkLocalize
  } = {
    [key in LinksDefinitionKey]: ServiceOptionLinkLocalize
  }
>(global: {
  brand: Brand
  links: LinksDefinition
  price: PriceOptions
}) => (localize: {
  brand: BrandLocalize
  price: PriceOptionsLocalizeBasic
  links: LocalizedLinksDefinition
}) => (
  linksHandler: LinksHandler<LinksDefinitionKey> | "default-links"
) => {
  const handleLinks: LinksHandler<LinksDefinitionKey> =
    typeof linksHandler === "string"
      ? ({ initializeAll }) => initializeAll()
      : linksHandler
  return new Service<LinksDefinitionKey>(merge(localize, global)).links(handleLinks)
}
