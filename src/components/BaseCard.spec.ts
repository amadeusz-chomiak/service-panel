import { Base } from '../../tests/utils/core'
import Component from './BaseCard.vue'
const base = new Base(Component)

describe('components/BaseCard.vue', () => {
  it('', async () => {
    const { getByText } = base.render()
  })
})
