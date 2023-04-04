// 登录背景图片模拟
export const bgcArr = [
    // 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcn.best-wallpaper.net%2Fwallpaper%2F1920x1080%2F1709%2FMountains-valley-river-nature-landscape_1920x1080.jpg&refer=http%3A%2F%2Fcn.best-wallpaper.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664503787&t=31828a27083059bf7b54964898559d92',
    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.deskcar.com%2Fdesktop%2Ffengjing%2F2013107195117%2F10.jpg&refer=http%3A%2F%2Fwww.deskcar.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664503787&t=6023bc3fc39a57200f466b036ba68ea3',
    // 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fv3wall.com%2Fwallpaper%2F1920_1080%2F1505%2F1920_1080_20150525120340397845.jpg&refer=http%3A%2F%2Fv3wall.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664503787&t=afdbbe35fd8231654da2e97f861089dc',
    'https://img2.baidu.com/it/u=2649320592,2051266660&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800',
    'https://gss0.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/f703738da97739124a1fb92ffe198618367ae247.jpg',
    'https://10wallpaper.com/wallpaper/1920x1080/1204/maui-American_beach_scenery_wallpaper_1920x1080.jpg',
    'https://10wallpaper.com/wallpaper/1920x1080/1605/Beach_Purple_Evening-Landscape_theme_HD_Wallpaper_1920x1080.jpg',
    'https://img1.baidu.com/it/u=2217129075,2183422488&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
    'https://gss0.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/f11f3a292df5e0fef4d39f74546034a85fdf72ff.jpg',
    'https://img0.baidu.com/it/u=722258149,2757200548&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800',
    'https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/c9fcc3cec3fdfc03bfdd4821d53f8794a5c22685.jpg',
]

// 左上角图标模拟
export const getIcon = [
    'dance',
    'message',
    'music',
    'pay',
    'play',
    'work',
]

// 日历组件背景图
export const picList = [
    '/src/assets/gif/windy.jpg',
    '/src/assets/gif/bigRainy.jpg',
    '/src/assets/gif/bigSnow.jpg',
    '/src/assets/gif/cloudy.jpg',
    '/src/assets/gif/rain.jpg',
    '/src/assets/gif/smallRainy.png',
    '/src/assets/gif/snow.jpg',
    '/src/assets/gif/springFirst.jpg',
]

export const getBgcSet = (arr: string[]) => { // 随机生成函数
    return arr[Math.floor(Math.random() * arr.length)]
}
export default { getBgcSet, bgcArr, getIcon }