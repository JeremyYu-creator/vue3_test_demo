import { defineStore } from "pinia";
import { MenuState, } from "@/typing/store";

export const MenuSetting = defineStore({
    id: 'MenuSetting',
    state: (): MenuState => (
        {
            openKeys: [''],
            selectedKeys: ['']
        }
    ),
    actions: {
        setOpenKeys(openKeys: string[]) {
            this.openKeys = openKeys
        },
        setSelectKeys(selectedKeys: string[]) {
            this.selectedKeys = selectedKeys
        }
    },
    persist: { // 实际上是通过storage方式进行存储, 注意默认是sessionStorage
        enabled: true,
        strategies: [
            {
                key: 'MenuSetting',
                // storage: localStorage,
                storage: sessionStorage,
            }
        ]
    }
})