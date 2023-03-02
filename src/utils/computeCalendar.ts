
// import moment from 'moment'
const dayTimeNotice = () => {
    // let currentTime = moment().format("YYYY-MM-DD HH:mm:ss")
    let currentHour = new Date().getHours()
    return dealTime(currentHour)
}

// 获取到当前处于今天的某个时刻
const dealTime = (time: number) => {
    if (time >= 0 && time < 6) {
        return '凌晨了,夜深了早点休息吧~'
    } else if (time >= 6 && time < 9) {
        return '早上好，今天也要充满活力哦~'
    } else if (time >= 9 && time < 12) {
        return '上午好，开始一天繁忙的工作吧~'
    } else if (time >= 12 && time < 14) {
        return '中午好，今天午饭想吃些什么呢~'
    } else if (time >= 14 && time < 19) {
        return '下午好，坚持就是胜利~'
    } else if (time >= 19 && time <= 24) {
        return '晚上好，不要再卷了，回家休息吧~'
    } 
    return '每天都要充满活力'
}

const timeDeal = (time: string, event: string) => {
    const now = new Date().getTime()
    // 转换成标准时间
    let tmpTime = Date.parse(time.replace(/-/gi, "/"));
    // console.log(tmpTime, 'tmpTime')
    let result: any = null
    // 设置的计算单位
    let minute = 1000 * 60;
    let hour = minute * 60;
    let day = hour * 24;
    let week = day * 7;
    let month = day * 30;
    // year需要动态判断，因为可能会出现闰年
    let year = day * 365;
    // 判断类型，是纪念日还是倒计时
    
    let type = ''
    type = tmpTime - now < 0 ? 'jinianri' : 'daojishi'
    let diffValue = tmpTime - now < 0 ? now - tmpTime : tmpTime - now
    const yearC = (diffValue / year) + ''
    const monthC = (diffValue / month) + ''
    const weekC = (diffValue / week) + ''
    const dayC = (diffValue / day) + ''
    const hourC = (diffValue / hour) + ''
    const minC = (diffValue / minute) + ''
    const secC = ((diffValue % (1000 * 60)) / 1000) + ''
    let leftYear = parseInt(yearC)
    let leftMonth = parseInt(monthC)
    let leftWeek = parseInt(weekC)
    let leftDay = parseInt(dayC)
    let leftHour = parseInt(hourC) % 24
    let leftMinute = parseInt(minC) % 60
    let leftSecond = parseInt(secC)
        // result = `距离${event}还有${leftDay === 0 ? '' : leftDay + '天'}${leftHour}小时${leftMinute}分${leftSecond}秒`
    result = {
        leftYear,
        leftMonth,
        leftWeek,
        leftDay,
        leftHour,
        leftMinute,
        leftSecond,
        type,
        event
    }
    return result

}

export { dayTimeNotice, timeDeal }