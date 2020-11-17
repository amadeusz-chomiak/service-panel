import { Category } from './definitionGeneratorCategory'

export class Renderer {
  private readonly categories = new Map<
    Symbol,
    ReturnType<Category["export"]>
  >()

  add(instance: Category) {
    this.categories.set(instance.id, instance.export())
    return this
  }

  export() {
    return Array.from(this.categories.values())
  }
}