---
to: src/definitions/<%= h.changeCase.camel(name) %>/categoryDefinitions.ts
---

import { Category } from '../definitionGenerators'

export const analytic = new Category({
  name: 'analytic',
  description: 'for testing Your content'
})