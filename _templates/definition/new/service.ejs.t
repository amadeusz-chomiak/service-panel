---
to: src/definitions/<%= h.changeCase.camel(name) %>/serviceDefinitions.ts
---

import { Service } from '../definitionGenerators'

export const firebase = new Service({
  brand: {
    name: 'firebase',
    description: 'Hosting',
    color: '#FFA000',
    onColor: 'white',
  }
})