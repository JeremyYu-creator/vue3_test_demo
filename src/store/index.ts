// src/store/index.ts
import { GlobalStore } from '@/store/modules/user'
const useStore = () => {
    return {
        user: GlobalStore()
    }
}
export default useStore;
