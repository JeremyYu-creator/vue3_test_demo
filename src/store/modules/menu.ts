import { defineStore } from "pinia";
import { MenuState, BreadcrumbType} from "@/typing/store";

export const MenuSetting = defineStore({
    id: 'MenuSetting',
    state: (): MenuState => (
        {
            openKeys: [''],
            selectedKeys: [''],
            path: '',
            breadcrumbArr: [],
        }
    ),
    actions: {
        setOpenKeys(openKeys: string[]) {
            this.openKeys = openKeys
        },
        setSelectKeys(selectedKeys: string[]) {
            this.selectedKeys = selectedKeys
        },
        setRouterPath(path: string) {
            this.path = path
        },
        // 用来做面包屑用的一个方法
        setBreadCrumb(breadcrumb: BreadcrumbType[]) {
            this.breadcrumbArr = breadcrumb
        },
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