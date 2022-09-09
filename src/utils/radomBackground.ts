// 登录背景图片模拟
export const bgcArr = [
    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg9.51tietu.net%2Fpic%2F2019-091323%2Fheylamt3itgheylamt3itg.jpg&refer=http%3A%2F%2Fimg9.51tietu.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664503787&t=61d3bf4363d956df842bd8a2823f8d2e',
    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg9.51tietu.net%2Fpic%2F2019-091109%2Fust10ifihrcust10ifihrc.jpg&refer=http%3A%2F%2Fimg9.51tietu.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664503787&t=eb51ce633f0ac6feac1c0789c41af139',
    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcn.best-wallpaper.net%2Fwallpaper%2F1920x1080%2F1709%2FMountains-valley-river-nature-landscape_1920x1080.jpg&refer=http%3A%2F%2Fcn.best-wallpaper.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664503787&t=31828a27083059bf7b54964898559d92',
    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg9.51tietu.net%2Fpic%2F2019-091211%2Fwkbrtjari3vwkbrtjari3v.jpg&refer=http%3A%2F%2Fimg9.51tietu.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664503787&t=e2cb805b72b1f6c1eabc0b048585e9d7',
    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg9.51tietu.net%2Fpic%2F2019-091222%2Fzq0qpnifprgzq0qpnifprg.jpg&refer=http%3A%2F%2Fimg9.51tietu.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664503787&t=2a08c471ffcc368befe31807b0f06154',
    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.deskcar.com%2Fdesktop%2Ffengjing%2F2013107195117%2F10.jpg&refer=http%3A%2F%2Fwww.deskcar.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664503787&t=6023bc3fc39a57200f466b036ba68ea3',
    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fv3wall.com%2Fwallpaper%2F1920_1080%2F1505%2F1920_1080_20150525120340397845.jpg&refer=http%3A%2F%2Fv3wall.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664503787&t=afdbbe35fd8231654da2e97f861089dc',
    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg9.51tietu.net%2Fpic%2F2019-091211%2Fdhdeq0irz53dhdeq0irz53.jpg&refer=http%3A%2F%2Fimg9.51tietu.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664503787&t=788a3c84e03d71e528560fc57c8b19f0',
    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg9.51tietu.net%2Fpic%2F2019-090907%2Fb1v1c2rbnabb1v1c2rbnab.jpg&refer=http%3A%2F%2Fimg9.51tietu.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664503787&t=aa621f9b72f83bd384bd2d2c1e2ffd8b'
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

export const getBgcSet = (arr: string[]) => { // 随机生成函数
    return arr[Math.floor(Math.random() * arr.length)]
}
export default { getBgcSet, bgcArr, getIcon }