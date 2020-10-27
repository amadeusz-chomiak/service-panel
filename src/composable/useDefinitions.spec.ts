import { Renderer, Category, Service } from "@/definitions/definitionGenerators"
import { useDefinitions } from "./useDefinitions"
import {isReactive} from "vue"
let renderer: Renderer
let category: Category
let service: Service

describe("composable/useDefinitions.ts", () => {
  describe("composable", () => {
    it("return render as a computed with array as a value", () => {
      const { render } = useDefinitions()
      const value = render.value
      expect(Array.isArray(value)).toBe(true)
    })
  })
 
  describe("definition generation basic", () => {
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
                name: "link",
                description: "description",
                href: "href",
              },
            ],
          },
        ],
      },
    ]

    beforeEach(() => {
      renderer = new Renderer()
      category = new Category({
        name: "category",
        description: "description",
      })
      service = new Service({
        brand: {
          color: "#fff",
          onColor: "black",
          name: "service",
          description: "description",
        },
        links: new Map([
          [
            "link",
            {
              description: "description",
              href: "href",
            },
          ],
        ]),
      })
    })
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
  describe("definition generation service links", () => {
    beforeEach(() => {
      renderer = new Renderer()
      category = new Category({
        name: "category",
        description: "description",
      })
      service = new Service({
        brand: {
          color: "#fff",
          onColor: "black",
          name: "service",
          description: "description",
        },
        links: new Map([
          [
            "link",
            {
              description: "description",
              href: "href",
            },
          ],
        ]),
      })
    })
    it("service allow links extension", async () => {
      renderer.add(
        category.add(
          service.link("added", {
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
                  name: "link",
                  description: "description",
                  href: "href",
                },
                {
                  name: "added",
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
          service.link("link", {
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
                  name: "link",
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
})
