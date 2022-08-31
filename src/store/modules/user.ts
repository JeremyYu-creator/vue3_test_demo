// src/store/index.ts
import { defineStore } from 'pinia';

interface GlobalState { // 这种文件都可以单独拿出来
    token: string,
    userInfo: {
        userName: string,
        password: string,
    },
}
interface TokenRequest {
    desc: string,
    token: string
}
const getData = () => {
    return new Promise<TokenRequest>((resolve, reject) => {
        resolve({
            desc: 'success',
            token: '#asdsa123',
        })
    }).then((res) => {
        return res
    }).catch((err) => {
        console.log(err)
    })
}
// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const GlobalStore = defineStore({
    id: 'GlobalState', // id: 必须的，在所有 Store 中唯一
    // state: 返回对象的函数
    state: (): GlobalState => ({
        token: '',
        userInfo: {
            userName: '',
            password: '',
        }
    }),
    getters: {},
    actions: {
        // 不使用箭头函数
        setToken(token: string) {
            this.token = token;
        },
        setUserInfo(userInfo: any) {
            this.userInfo = userInfo;
        },
        async sendUserInfo(userInfo: any) {
            return await getData()
        }
    },
    // 持久化
    persist: { // 实际上是通过storage方式进行存储, 注意默认是sessionStorage
        enabled: true,
        strategies: [
            {
                key: 'GlobalState',
                // storage: localStorage,
                storage: sessionStorage,
            }
        ]
    }
});
// const pinia = createPinia();
// pinia.use(piniaPersist);
//
// export default pinia;
