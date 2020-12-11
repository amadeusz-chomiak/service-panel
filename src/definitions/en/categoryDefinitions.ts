
import { Category } from '../definitionGenerator'

export const analytic = new Category({
  name: 'analytic',
  description: 'for testing Your content'
})

export const domain = new Category({
  name: 'domain',
  description: 'check Your domains status'
})

export const server = new Category({
  name: 'server',
  description: 'check were all site data lives'
})

//todo implement with payments module
// export const payments = new Category({
//   name: 'payments',
//   description: 'check Your spendings'
// })

export const development = new Category({
  name: 'development',
  description: 'when You need to expand Your site'
})

export const contentEditor = new Category({
  name: 'content editor',
  description: 'for changing this site content'
})

export const searchEngine = new Category({
  name: 'search engines',
  description: 'how to find Your site'
})