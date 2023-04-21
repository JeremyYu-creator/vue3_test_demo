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
    selectedKeys: string[],
    path: string,
    breadcrumbArr: BreadcrumbType[],
}

export interface BreadcrumbType {
    name: string,
    path: string,
    key: string,
    child: boolean
}

export default { GlobalState, TokenRequest, MenuState, BreadcrumbType }