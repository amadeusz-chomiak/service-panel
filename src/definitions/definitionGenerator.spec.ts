import {
  Renderer,
  Category,
  Service,
  createService,
  Price,
} from "./definitionGenerator"
import { cloneDeep } from "lodash"
let renderer: Renderer
let category: Category
let price: Price
let service: Service<"link">

const expectedResultTemplate = {
  interface: {
    header: {
      title: "header-title",
      link: {
        title: "title",
        href: "href",
      },
      skipToMain: {
        title: "skipToMainContentTitle",
      },
    },
    controls: {
      title: "controls-title",
      versionControl: {
        tooltip: "tooltip",
      },
      colorScheme: {
        buttonLabel: {
          changeToLightMode: "changeToLightMode",
          changeToDarkMode: "changeToDarkMode",
        },
      },
      navigation: {
        buttonLabel: "navigation menu",
      },
    },
  },
  categories: [
    {
      name: "category",
      description: "description",
      services: [
        {
          brand: {
            color: "#fff",
            onColor: "black",
            name: "service",
            description: "description",
          },
          links: [
            {
              title: "link",
              description: "description",
              href: "href",
            },
          ],
          price: "monthly paid",
        },
      ],
    },
  ],
}
const expectedResultGenerator = (
  change: (expected: typeof expectedResultTemplate) => object = expected =>
    expected
) => ({
  ...expectedResultTemplate,
  ...change(cloneDeep(expectedResultTemplate)),
})

describe("definitions/definitionGenerator.ts", () => {
  beforeEach(() => {
    //? redefine renderer
    renderer = new Renderer({
      header: {
        title: "header-title",
        link: {
          title: "title",
          href: "href",
        },

        skipToMain: {
          title: "skipToMainContentTitle",
        },
      },
      controls: {
        title: "controls-title",
        versionControl: {
          tooltip: "tooltip",
        },
        colorScheme: {
          buttonLabel: {
            changeToLightMode: "changeToLightMode",
            changeToDarkMode: "changeToDarkMode",
          },
        },
        navigation: {
          buttonLabel: "navigation menu",
        },
      },
    })

    //? redefine category template
    category = new Category({
      name: "category",
      description: "description",
    })

    //? redefine price translation module
    price = new Price({
      cost: {
        free: "free",
        paid: "paid",
        flexible: "flexible",
      },
      renew: {
        never: "never",
        onDemand: "onDemand",
        daily: "daily",
        weekly: "weekly",
        monthly: "monthly",
        quarterly: "quarterly",
        yearly: "yearly",
      },
      compose({ renew, cost }) {
        return renew + " " + cost
      },
    })

    //? redefine service template
    service = createService<"link">({
      brand: {
        color: "#fff",
        onColor: "black",
        name: "service",
      },
      links: {
        link: {
          href: "href",
        },
      },
      price: {
        cost: "paid",
        renew: "monthly",
      },
    })(
      //? define translation module of service
      {
        brand: {
          description: "description",
        },
        price: {
          localize: price,
        },
        links: {
          link: {
            title: "link",
            description: "description",
          },
        },
      }
    )(
      //? initialize link of service
      ({ initializeAll }) => initializeAll()
    )
  })
  describe("basic", () => {
    it("renderer returns category with service", async () => {
      renderer.add(category.add(service))

      expect(renderer.export()).toStrictEqual(expectedResultGenerator())
    })

    it("renderer remove duplicates from categories and services", async () => {
      renderer
        .add(category.add(service).add(service))
        .add(category)
        .add(category.add(service))

      expect(renderer.export()).toStrictEqual(expectedResultGenerator())
    })
  })
  describe("service links", () => {
    it("service allow links extension", async () => {
      renderer.add(
        category.add(
          service.links(({ initialize }) => [
            initialize("link"),
            {
              title: "added",
              description: "description",
              href: "href",
            },
          ])
        )
      )
      expect(renderer.export()).toStrictEqual(
        expectedResultGenerator(expected => {
          expected.categories[0].services[0].links.push({
            title: "added",
            description: "description",
            href: "href",
          })
          return expected
        })
      )
    })
  })

  describe("allow change of texts on instance", () => {
    describe("category generator", () => {
      it("allow change of content", () => {
        renderer.add(
          category
            .content({ name: "change", description: "change" })
            .add(service)
        )

        expect(renderer.export()).toStrictEqual(
          expectedResultGenerator(expected => {
            expected.categories[0].name = "change"
            expected.categories[0].description = "change"
            return expected
          })
        )
      })
    })

    describe("service generator", () => {
      it("allow change of brand", () => {
        renderer.add(
          category.add(
            service.brand({
              name: "change",
              color: "change",
              description: "change",
              onColor: "change",
            })
          )
        )

        expect(renderer.export()).toStrictEqual(
          expectedResultGenerator(expected => {
            expected.categories[0].services[0].brand = {
              name: "change",
              color: "change",
              description: "change",
              onColor: "change",
            }

            return expected
          })
        )
      })
      it("allow change of price", () => {
        renderer.add(category.add(service.price({ renew: "daily" })))

        expect(renderer.export()).toStrictEqual(
          expectedResultGenerator(expected => {
            expected.categories[0].services[0].price = "daily paid"

            return expected
          })
        )
      })
    })
  })
})
