import { ref } from 'vue'
const useHookByMyself = () => {
    const num = ref(1)
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