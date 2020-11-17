import {
  Renderer,
  Category,
  Service,
  createService,
} from "./definitionGenerator"
let renderer: Renderer
let category: Category
let service: Service<{}>

describe("definitions/definitionGenerator.ts", () => {
  beforeEach(() => {
    renderer = new Renderer()
    category = new Category({
      name: "category",
      description: "description",
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
    })({
      brand: {
        description: "description",
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
            },
          ],
        },
      ]
      expect(renderer.export()).toStrictEqual(expectedResult)
    })
  })
  describe("price module", () => {
    it("renderer returns ")
  })
})
