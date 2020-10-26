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
          onColor: "black",
          name: "service",
          description: "description"
        }
      })
    }) 
    it("renderer returns category with service brand", async () => {
      renderer.add(category.add(service))
  
      expect(renderer.export()).toStrictEqual([{
        name: "category",
        description: "description",
        services: [
          { 
            brand: {
              color: "#fff",
              onColor: "black",
              name: "service",
              description: "description"
            }
          }
        ]
      }])
    })
  
    it("renderer remove duplicates from categories and services", async () => {
      renderer
        .add(category.add(service).add(service))
        .add(category)
        .add(category.add(service))
  
      expect(renderer.export()).toStrictEqual([{
        name: "category",
        description: "description",
        services: [
          { 
            brand: {
              color: "#fff",
              onColor: "black",
              name: "service",
              description: "description"
            }
          }
        ]
      }])
    })
  })
})
