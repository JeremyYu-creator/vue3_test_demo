import { selectOptions } from '@/typing/options'
const CompareOptions = (arr: selectOptions[]) => {
    arr.sort((itemPre: selectOptions, itemNext: selectOptions) => {
        return itemPre.count - itemNext.count;
    })
    return arr
}
export { CompareOptions }