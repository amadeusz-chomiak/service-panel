
interface ServiceOptions {
  brand: {
    color: string,
    onColor: 'black' | 'white',
    name: string,
    description: string
  }
}

export class Service {
  constructor(private readonly options: ServiceOptions){}

  export() {
    return this.options
  }
}

interface CategoryOptions{
  name: string,
  description: string
}

export class Category {
  private readonly services = new Set<ReturnType<Service["export"]>>()
  public readonly id = Symbol()
  constructor(private readonly options: CategoryOptions){}
  
  add(instance: Service) {
    this.services.add(instance.export())
    return this
  }

  export() {
    return {
      ...this.options,
      services: Array.from(this.services)
    }
  } 
}

export class Renderer {
  private readonly categories= new Map<Symbol, ReturnType<Category["export"]>>()

  add(instance: Category) {
    this.categories.set(instance.id, instance.export())
    return this
  }

  export() {
    return Array.from(this.categories.values())
  }
}

