// 要将此文件放在与加载组件同大级的目录：src下，否则引入不生效
// 此处声明是因为全局挂载了属性方法但没有ts定义类型，因此需要在这里声明
import { ComponentCustomProperties } from '@vue/runtime-core'

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $antIcons: any
    }
}

declare interface Window {
    AMap: any,
    initMap: any
}

export default ComponentCustomProperties
