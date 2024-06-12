import { ref } from 'vue'
let num = ref(10)
const test = async() => {
   Promise.resolve(num.value++)
}
const useHookByMyself = async() => {
    // const num = ref(1)
    await test()
    const increaseNum = () => {
        num.value++
    }
    const decreaseNum = () => {
        num.value--
    }
    return {
        num,
        increaseNum,
        decreaseNum,
    }
}

export { useHookByMyself }