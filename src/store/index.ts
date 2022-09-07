// src/store/index.ts
import { GlobalStore } from '@/store/modules/user'
import { MenuSetting } from '@/store/modules/menu'
const useStore = () => {
    return {
        user: GlobalStore(),
        menu: MenuSetting()
    }
}
export default useStore;
