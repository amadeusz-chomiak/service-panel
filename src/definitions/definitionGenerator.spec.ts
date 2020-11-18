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
let service: Service<{}>

const expectedResultTemplate = {
  interface: {
    header: {
      title: "title",
      link: {
        title: "title",
        href: "href",
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
        title: "title",
        link: {
          title: "title",
          href: "href",
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
    service = createService({
      brand: {
        color: "#fff",
        onColor: "black",
        name: "service",
      },
      links: {
        link: "href",
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
      }
    ) //? initialize link of service
      .links("initialize", "link", {
        title: "link",
        description: "description",
      })
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
          service.links("add", "added", {
            title: "added",
            description: "description",
            href: "href",
          })
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

    it("service allow existing links change", async () => {
      renderer.add(
        category.add(
          service.links("change", "link", {
            description: "change",
            href: "change",
          })
        )
      )

      expect(renderer.export()).toStrictEqual(
        expectedResultGenerator(expected => {
          expected.categories[0].services[0].links[0] = {
            title: "link",
            description: "change",
            href: "change",
          }
          return expected
        })
      )
    })
  })
  describe("detach from default instance", () => {
    it("allow duplicates if at least one is detached", () => {
      renderer.add(category.add(service.detach()).add(service))

      expect(renderer.export()).toStrictEqual(
        expectedResultGenerator(expected => {
          const serviceClone = expected.categories[0].services[0]
          expected.categories[0].services.push(serviceClone)
          return expected
        })
      )
    })

    it("allow different values of detached service", () => {
      renderer.add(
        category.add(service).add(
          service.detach().links("add", "added", {
            title: "added",
            href: "href",
            description: "description",
          })
        )
      )

      expect(renderer.export()).toStrictEqual(
        expectedResultGenerator(expected => {
          const serviceClone = expected.categories[0].services[0]
          const brandClone = serviceClone.brand
          const linksClone = serviceClone.links
          const priceClone = serviceClone.price
          expected.categories[0].services.push({
            brand: brandClone,
            links: [
              ...linksClone,
              {
                title: "added",
                description: "description",
                href: "href",
              },
            ],
            price: priceClone,
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
