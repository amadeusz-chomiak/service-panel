import { Renderer, Category, Service } from "@/definitions/definitionGenerators"

let renderer: Renderer
let category: Category
let service: Service

describe("composable/useDefinitions.ts", () => {
  describe('basic', () => {
    beforeEach(() => {
      renderer = new Renderer()
      category = new Category({
        name: "category",
        description: "description"
      })
      service = new Service({
        brand: {
          color: "#fff",
          onColor: "#000",
          name: "service",
          description: "description"
        }
      })
    })
    it("renderer returns category with service brand", async () => {
      renderer.category(category.service(service))
  
      expect(renderer.export()).toStrictEqual([{
        name: "category",
        description: "description",
        services: [
          { 
            brand: {
              color: "#fff",
              onColor: "#000",
              name: "service",
              description: "description"
            }
          }
        ]
      }])
    })
  
    it("renderer remove duplicates from categories and services", async () => {
      renderer
        .category(category.service(service).service(service))
        .category(category)
        .category(category.service(service))
  
      expect(renderer.export()).toStrictEqual([{
        name: "category",
        description: "description",
        services: [
          { 
            brand: {
              color: "#fff",
              onColor: "#000",
              name: "service",
              description: "description"
            }
          }
        ]
      }])
    })
  })
})
