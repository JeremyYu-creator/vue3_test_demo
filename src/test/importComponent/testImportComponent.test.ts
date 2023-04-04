// import TestHeader from '@/components/TestVue3Components/TestHeader.vue'
// import TestVue3AnotherHeader from '@/components/TestVue3Components/TestVue3AnotherHeader.vue'
import { describe } from 'vitest'
describe('import vue components', () => {
    test('normal imports as expected', async () => {
      const cmp = await import('@/components/TestVue3Components/TestHeader.vue')
      // const cmp = await TestHeader
      expect(cmp).toBeDefined()
    })
  
    test('template string imports as expected', async () => {
      // eslint-disable-next-line @typescript-eslint/quotes
      // const cmp = TestVue3AnotherHeader
      const cmp = await import('@/components/TestVue3Components/TestVue3AnotherHeader.vue')
      expect(cmp).toBeDefined()
    })
  
    test('dynamic imports as expected', async () => {
      const name = 'index'
      const cmp = await import(`@/components/table/${name}.vue`)
      expect(cmp).toBeDefined()
    })
  })