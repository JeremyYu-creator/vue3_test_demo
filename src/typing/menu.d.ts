export default interface MenuList {
    key: string,
    title: string,
    icon: string,
    meta: string,
    children: null | MenuList
}
