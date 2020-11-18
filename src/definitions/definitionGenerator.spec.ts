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
    renderer = new Renderer({
      header: {
        title: "title",
        link: {
          title: "title",
          href: "href",
        },
      },
    })
    category = new Category({
      name: "category",
      description: "description",
    })

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
    }).links("initialize", "link", {
      title: "link",
      description: "description",
    })
  })

  describe("basic", () => {
    const expectedResult = {
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
          service.links("add", "added", {
            title: "added",
            description: "description",
            href: "href",
          })
        )
      )
      const expectedResult = {
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
        ],
      }
      expect(renderer.export()).toStrictEqual(expectedResult)
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
      const expectedResult = {
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
                    description: "change",
                    href: "change",
                  },
                ],
                price: "monthly paid",
              },
            ],
          },
        ],
      }
      expect(renderer.export()).toStrictEqual(expectedResult)
    })
  })
  describe("detach from default instance", () => {
    it("allow duplicates if at least one is detached", () => {
      renderer.add(category.add(service.detach()).add(service))
      const expectedResult = {
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
      expect(renderer.export()).toStrictEqual(expectedResult)
    })

    it("allow different values of detached service", () => {
      renderer.add(
        category
          .add(
            service.detach().links("add", "added", {
              title: "added",
              href: "href",
              description: "description",
            })
          )
          .add(service)
      )
      const expectedResult = {
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
        ],
      }
      expect(renderer.export()).toStrictEqual(expectedResult)
    })
  })

  describe("price module", () => {
    it.todo("can change cost and renew after initialization")
    it.todo("can change compose function after initialization")
  })

  describe("allow change of texts on instance", () => {
    describe("category generator", () => {
      it("allow change of content", () => {
        const expectedResult = {
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
              name: "change",
              description: "change",
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
        renderer.add(
          category
            .content({ name: "change", description: "change" })
            .add(service)
        )

        expect(renderer.export()).toStrictEqual(expectedResult)
      })
    })

    describe("service generator", () => {
      it("allow change of brand", () => {
        const expectedResult = {
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
                    color: "change",
                    onColor: "change",
                    name: "change",
                    description: "change",
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

        expect(renderer.export()).toStrictEqual(expectedResult)
      })
      it("allow change of price", () => {
        const expectedResult = {
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
                  price: "daily paid",
                },
              ],
            },
          ],
        }

        renderer.add(category.add(service.price({ renew: "daily" })))

        expect(renderer.export()).toStrictEqual(expectedResult)
      })
    })
  })
})
