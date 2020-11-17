import {
  Renderer,
  Category,
  Service,
  createService,
  Price,
} from "./definitionGenerator"
let renderer: Renderer
let category: Category
let price: Price
let service: Service<{}>

describe("definitions/definitionGenerator.ts", () => {
  beforeEach(() => {
    renderer = new Renderer()
    category = new Category({
      name: "category",
      description: "description",
    })

    price = new Price({
      cost: {
        free: "free",
        paid: "paid",
        flexible: "flexible"
      },
      renew: {
        never: "never",
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
    })({
      brand: {
        description: "description",
      },
      price: {
        localize: price,
      },
    }).link("initialize", "link", {
      title: "link",
      description: "description",
    })
  })

  describe("basic", () => {
    const expectedResult = [
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
    ]

    it("renderer returns category with service", async () => {
      renderer.add(category.add(service))

      expect(renderer.export()).toStrictEqual(expectedResult)
    })

    it("renderer remove duplicates from categories and services", async () => {
      renderer
        .add(category.add(service).add(service))
        .add(category)
        .add(category.add(service))

      expect(renderer.export()).toStrictEqual(expectedResult)
    })
  })
  describe("service links", () => {
    it("service allow links extension", async () => {
      renderer.add(
        category.add(
          service.link("add", "added", {
            title: "added",
            description: "description",
            href: "href",
          })
        )
      )
      const expectedResult = [
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
                {
                  title: "added",
                  description: "description",
                  href: "href",
                },
              ],
              price: "monthly paid",
            },
          ],
        },
      ]
      expect(renderer.export()).toStrictEqual(expectedResult)
    })

    it("service allow existing links change", async () => {
      renderer.add(
        category.add(
          service.link("change", "link", {
            description: "change",
            href: "change",
          })
        )
      )
      const expectedResult = [
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
                  description: "change",
                  href: "change",
                },
              ],
              price: "monthly paid",
            },
          ],
        },
      ]
      expect(renderer.export()).toStrictEqual(expectedResult)
    })
  })
  describe("detach from default instance", () => {
    it("allow duplicates if at least one is detached", () => {
      renderer.add(category.add(service.detach()).add(service))
      const expectedResult = [
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
      ]
      expect(renderer.export()).toStrictEqual(expectedResult)
    })

    it("allow different values of detached service", () => {
      renderer.add(
        category
          .add(
            service.detach().link("add", "added", {
              title: "added",
              href: "href",
              description: "description",
            })
          )
          .add(service)
      )
      const expectedResult = [
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
                {
                  title: "added",
                  description: "description",
                  href: "href",
                },
              ],
              price: "monthly paid",
            },
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
      ]
      expect(renderer.export()).toStrictEqual(expectedResult)
    })
  })
  describe("price module", () => {
    it.todo("can change cost and renew after initialization")
    it.todo("can change compose function after initialization")
  })
})
