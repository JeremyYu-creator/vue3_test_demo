export const isMaxHeight = () => { // 判断当前屏幕大小(高度：900/1200):目前只考虑主流
    return window.screen.height > 1000
}

export default { isMaxHeight }