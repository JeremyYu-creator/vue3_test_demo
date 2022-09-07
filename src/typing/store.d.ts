export interface GlobalState { // 这种文件都可以单独拿出来
    token: string,
    userInfo: {
        userName: string,
        password: string,
    },
}
export interface TokenRequest {
    desc: string,
    token: string
}

export interface MenuState {
    openKeys: string[],
    selectedKeys: string[]
}

export default { GlobalState, TokenRequest, MenuState }