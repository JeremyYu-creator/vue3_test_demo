<script lang="ts" setup>
import { ref, onMounted, onUnmounted, toRefs } from 'vue'
import { dayTimeNotice, timeDeal } from '@/utils/computeCalendar'
import { getBgcSet, picList } from '@/utils/radomBackground'
import { getLunar } from 'chinese-lunar-calendar'
import { Dayjs } from 'dayjs'
import { DataType } from '@/typing/tableComponent'
// import mitt from 'mitt'
import mittEvent from '@/mitt/grandFather'
import SmileOutlined from 'ant-design-vue';
// import meihua from '@/assets/gif/meihua.gif'
const noticeText = ref('')
const aimText = ref('')
const cardType = ref('')
const timer: any = ref(null)
const bgcTimer: any = ref(null)
const dataSource = ref([] as DataType[])
interface StringIndexedObject {
    [key: string]: string;
}
type LunarChineseYear = {
    dateStr: string,
    isLeap: boolean,
    lunarDate: number,
    lunarMonth: number,
    lunarYear: string,
    solarTerm: Object | null,
    zodiac: string
}
const pic = ref('')
// const mittEvent = mitt()
/**
 * fixme:enum枚举使用时，下方会出现enum的ts类型报警，后续看看
*/
// enum cardMap {
//     daojishi = '倒计时',
//     jinianri = '纪念日',
// }
const getCardBackgroundImg = () => {
    pic.value = getBgcSet(picList)
    console.log(pic.value)
}
const cardMap: StringIndexedObject = {
    'daojishi': '倒计时',
    'jinianri': '纪念日',
}
// 设置提示卡片详细内容
const setNotice = (time: string, thing: string) => {
    const { leftYear, leftMonth, leftWeek, leftDay, leftHour, leftMinute, leftSecond, type, event } = timeDeal(time, thing)
    // console.log(leftYear, leftMonth, leftWeek, leftDay, leftHour, leftMinute, leftSecond, type, event)
    cardType.value = type
    // 可被优化
    if (type === 'daojishi' && (leftYear !== 0 || leftMonth !== 0 || leftDay !== 0 || leftHour !== 0 || leftMinute !== 0 || leftSecond !== 0 || leftWeek !== 0)) {
        aimText.value = `距离${event}还有${leftDay === 0 ? '' : leftDay + '天'}${leftHour}小时${leftMinute}分${leftSecond}秒`
    } else {
        aimText.value = '时间到啦'
    }
}
// 获得农历接口的详细数据
const chineseLunarDay = toRefs<LunarChineseYear>({
    dateStr: '',
    isLeap: false,
    lunarDate: 0,
    lunarMonth: 0,
    lunarYear: '',
    solarTerm: null,
    zodiac: ''
})
const welcomeStr = ref('')
// type KeyLunarChineseYear = keyof LunarChineseYear
const getChineseLunarDay = () => {
    let year = new Date().getFullYear()
    let month = new Date().getMonth() + 1
    let date = new Date().getDate()
    // 需要判断是否存在该返回值
    const res = getLunar(year, month, date) as LunarChineseYear
    Object.keys(res).forEach((item: string) => {
        Object.keys(chineseLunarDay).forEach((iitem: string) => {
            if (item === iitem) {
                chineseLunarDay[iitem] = res[item as keyof LunarChineseYear]
            }
        })
    })
    welcomeStr.value = `今天是农历${chineseLunarDay.lunarYear}${chineseLunarDay.dateStr}`
    console.log(chineseLunarDay)
}
// 获取提示语
const getData = () => {
    noticeText.value = dayTimeNotice()
}
const strValue = ref('')
const yearValue = ref('')
const onChange = (date: Dayjs | string, dateString: string) => {
    // dateString是已经封装好的日期
    console.log(date, dateString)
    yearValue.value = dateString
}
const aimThing = ref('')
const beginValue = ref(false)
onMounted(() => {
    getCardBackgroundImg()
    getChineseLunarDay()
    // bgcTimer.value = setInterval(() => {
    //     getCardBackgroundImg()
    // }, 60000)
})
onUnmounted(() => {
    // 计时器在本组件消失后需要进行清空
    clearInterval(timer.value)
    clearInterval(bgcTimer.value)
})
const formatTime = ref('')
const test = () => {
    formatTime.value = yearValue.value + ' ' + strValue.value
    // strValue.value, yearValue.value , 
    beginValue.value = true
    if (beginValue.value) {
        timer.value = setInterval(() => {
            getData()
            setNotice(formatTime.value, aimThing.value)
        }, 1000)
    }
    console.log(formatTime.value,aimThing.value,cardType.value)
    mittEvent.emit('dataOn', {
        name: aimThing.value,
        time: formatTime.value,
    })
    mittEvent.emit('test', 'testtesttest')
}
</script>

<template>
    <div class="canlender-style">
        <div class="set-time-style">
            <a-input v-model:value="aimThing" placeholder="请输入内容" class="aim-text-style" />
            <a-date-picker @change="onChange" />
            <a-time-picker v-model:value="strValue" value-format="HH:mm:ss" />
            <a-button type="primary" @click="test">确定</a-button>
        </div>

        <div class="notice-mixin-style">
            <!--:style="{ '--myImgPath': 'url(' + src + ')' }"-->
            <!--todo：需要进行数据的存储，理论上是从服务端获取的-->
            <div class="notice-card-style" :style="{ backgroundImage: 'url(' + pic + ')' }">
                <div class="notice-title-style">{{ welcomeStr }}</div>
                <div class="notice-title-style">{{ noticeText }}</div>
                <div class="notice-text-style">{{ aimText }}</div>
            </div>
        </div>
        <div class="test-font-style">预览文字Abcd</div>
    </div>
</template>
<style lang="less">
.canlender-style {
    display: flex;
    flex-direction: column;
    .notice-mixin-style {
        display: flex;
        .notice-card-style {
            background-repeat: no-repeat;
            background-size: cover;
            margin-top: 30px;
            width: 500px;
            height: 250px;
            font-family: "al-shuheiti";
            // border: 0.5px solid rgba(0, 0, 0, 0.5);
            border-radius: 4px;
            // grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            // display: grid;
            // grid-template-columns: ;

            &:hover {
                cursor: pointer;
                box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
            }

            .notice-block-style {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
            }

            // cdn引用后续字体，这里如果有什么需要改变的，要注意引用源的时效性
            .notice-title-style {
                font-size: 20px;
            }

            .notice-text-style {
                font-size: 16px;
            }
        }

        .img-gif-style {
            margin-left: 20px;
            width: 500px;
            height: 300px;
        }
    }
}


.test-font-style {
    font-size: 20px;
    // font-family: "ali-east-regular";
    font-family: "al-shuheiti";
}


.set-time-style {
    margin-top: 20px;
    width: 650px;
    display: flex;
    justify-content: space-around;

    .aim-text-style {
        width: 200px;
    }
}
</style>