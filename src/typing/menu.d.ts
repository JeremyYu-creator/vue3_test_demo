export type MenuList = {
    key: string,
    title: string,
    icon: string,
    meta: string,
    children: null | MenuList
}[]


export interface MenuListItem {
    key: string,
    title: string,
    icon: string,
    meta: string,
    children: null | MenuList
}