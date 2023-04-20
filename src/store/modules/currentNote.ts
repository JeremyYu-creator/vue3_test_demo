import { defineStore } from "pinia";
interface defaultType {
    name: string,
    date: string,
    type: string,
}
export const currentNote: any = defineStore({
    id: 'CurrentNote',
    state: ():defaultType => (
        {
            name: '',
            date: '',
            type: ''
        }
    ),
    actions: {
        setName(name: string) {
            this.name = name
        },
        setDate(date: string) {
            this.date = date
        },
        setType(type: string) {
            this.type = type
        }
    },
    persist: { // 实际上是通过storage方式进行存储, 注意默认是sessionStorage
        enabled: true,
        strategies: [
            {
                key: 'CurrentNote',
                storage: sessionStorage,
            }
        ]
    }
})