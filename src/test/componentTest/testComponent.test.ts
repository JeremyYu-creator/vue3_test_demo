import { render, screen } from '@testing-library/vue'
import TestVue3AnotherHeaderVue from '@/components/TestVue3Components/TestVue3AnotherHeader.vue'

test('it should work', () => {
    const { getByText } = render(TestVue3AnotherHeaderVue, {
        props: {
            textMessage: {
                type: String,
                default: '',
            }
        }
    })
    // expect(screen.getByText("tab2"))
    expect(screen.getByText('neveda'))
})