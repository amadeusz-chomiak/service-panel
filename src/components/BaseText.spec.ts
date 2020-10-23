import { Base } from '../../tests/utils/core'
import Component from './BaseText.vue'
const base = new Base(Component)

describe('components/BaseText.vue', () => {
  it('', async () => {
    const { getByText } = base.render()
  })
})
