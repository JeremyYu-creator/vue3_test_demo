export function MapLoader () {
    let amap = (window as any).AMap
    let initmap = (window as any).initAMap
    return new Promise((resolve, reject) => {
        if (amap) {
            resolve(amap)
        }
        initmap = () => {
            resolve(amap)
        }
    })
}
