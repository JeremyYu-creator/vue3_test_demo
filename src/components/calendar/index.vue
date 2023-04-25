<script lang="ts" setup>
import { ref, onMounted, onUnmounted, toRefs, reactive } from 'vue'
import { dayTimeNotice, timeDeal } from '@/utils/computeCalendar'
import { getBgcSet, picList } from '@/utils/radomBackground'
import { getLunar } from 'chinese-lunar-calendar'
import { Dayjs } from 'dayjs'
// import { DataType } from '@/typing/tableComponent'
import {  getNoteBookData, insertNoteBookData, } from '@/api/test'
import mittEvent from '@/mitt/grandFather'
// import { errorCaptured } from '@/utils/error'
import { message } from 'ant-design-vue'
import { NoteBookCommonParams, StringIndexedObject, LunarChineseYear } from '@/typing/noteBook'
const noticeText = ref('')
const aimText = ref('')
const cardType = ref('')
const timer: any = ref(null)
const bgcTimer: any = ref(null)
// const dataSource = ref([] as DataType[])


const pic = ref('')
const getCardBackgroundImg = () => {
    pic.value = getBgcSet(picList)
    // console.log(pic.value)
}
const cardMap: StringIndexedObject = {
    'daojishi': '倒计时',
    'jinianri': '纪念日',
}
const thingType = ref('')
// 设置提示卡片详细内容
const setNotice = (time: string, thing: string) => {
    const { leftYear, leftMonth, leftWeek, leftDay, leftHour, leftMinute, leftSecond, type, event } = timeDeal(time, thing)
    // console.log(leftYear, leftMonth, leftWeek, leftDay, leftHour, leftMinute, leftSecond, type, event)
    cardType.value = type
    // 可被优化
    let arr = [leftYear, leftHour, leftMinute, leftMonth, leftSecond, leftWeek, leftDay,]
    // let arr = [0,0,0,0,0,0,1,1,1,]
    const isNotZero = (item: number) => {
        return item !==0 
    }
    thingType.value = cardMap[type]
    // console.log('--things的type--', thingType.value, type)
    if (type === 'daojishi' && arr.some(isNotZero)) {
        aimText.value = `距离${event}还有${leftDay === 0 ? '' : leftDay + '天'}${leftHour}小时${leftMinute}分${leftSecond}秒`
    } else {
        aimText.value = '时间到啦'
    }
    // if (type === 'daojishi' && (leftYear !== 0 || leftMonth !== 0 || leftDay !== 0 || leftHour !== 0 || leftMinute !== 0 || leftSecond !== 0 || leftWeek !== 0)) {
    //     aimText.value = `距离${event}还有${leftDay === 0 ? '' : leftDay + '天'}${leftHour}小时${leftMinute}分${leftSecond}秒`
    // } else {
    //     aimText.value = '时间到啦'
    // }
}
const typeLunar = reactive({
    dateStr: '',
    isLeap: false,
    lunarDate: 0,
    lunarMonth: 0,
    lunarYear: '',
    solarTerm: null,
    zodiac: ''
})
// 获得农历接口的详细数据
const chineseLunarDay = toRefs<LunarChineseYear>(typeLunar)
const welcomeStr = ref('')
// type KeyLunarChineseYear = keyof LunarChineseYear
const getChineseLunarDay = () => {
    let year = new Date().getFullYear()
    let month = new Date().getMonth() + 1
    let date = new Date().getDate()
    // 需要判断是否存在该返回值
    /**
     * 这里是第三方的库，不需要使用直接进行数据的网络请求，但是需要判断是否请求成功
     */
    try {
        const res = getLunar(year, month, date) as LunarChineseYear
        Object.keys(res).forEach((item: string) => {
            Object.keys(chineseLunarDay).forEach((iitem: string) => {
                if (item === iitem) {
                    chineseLunarDay[iitem] = res[item as keyof LunarChineseYear]
                }
            })
        })
        welcomeStr.value = `今天是农历${chineseLunarDay.lunarYear}${chineseLunarDay.dateStr}`
        // console.log(chineseLunarDay)
    } catch (err: any) {
        welcomeStr.value = '出错喽，请重试'
    }
    
}
// 获取提示语
const getNoticeWord = () => {
    noticeText.value = dayTimeNotice()
}
const strValue = ref('')
const yearValue = ref('')
// 监听上方时间戳发生改变的回调函数
const onChange = (date: Dayjs | string, dateString: string) => {
    // dateString是已经封装好的日期
    // console.log(date, dateString)
    yearValue.value = dateString
}
const aimThing = ref('')
const beginValue = ref(false)

const tableData = ref([] as NoteBookCommonParams[])
const total = ref(0)
const getInitData = async() => {
    try {
        // default params
        const res = await getNoteBookData({
            pageNo: 1,
            pageSize: 10, 
        })
        tableData.value = res.data.pageData
        total.value = res.data.total
        commonEmit()
        // console.log('----获取到的notebook数据---',res)
    } catch (err: any) {
        console.log('err', err)
        tableData.value = []
        message.error(`${err}`)
    }
}
const commonEmit = () => {
    mittEvent.emit('dataOn',
        {
            pageData: tableData.value,
            total: total.value,
            current: 1
        }
    )
}
const errorEmit = () => {
    mittEvent.emit('dataOn',
        {
            pageData: [],
            total: 0,
            current: 1,
        }
    )
}
onMounted(() => {
    getInitData()
    getCardBackgroundImg()
    getChineseLunarDay()
})
onUnmounted(() => {
    // 计时器在本组件消失后需要进行清空
    clearInterval(timer.value)
    clearInterval(bgcTimer.value)
})
const formatTime = ref('')
const sendPostData = async () => {
    try {
        formatTime.value = yearValue.value + ' ' + strValue.value
        beginValue.value = true
        let checkArr: any = ref([yearValue.value, strValue.value, aimThing.value])
        // 是空
        const isNullString = (item: string) => {
            return item !== ''
        }
        console.log(checkArr.value.every(isNullString), yearValue.value, strValue.value, aimThing.value)
        if (!checkArr.value.every(isNullString)) {
            message.warn('请填满必填信息')
        } else {
            if (beginValue.value) {
                timer.value = setInterval(() => {
                    getNoticeWord()
                    setNotice(formatTime.value, aimThing.value)
                }, 1000)
            }
            // 进行数据存储
            setNotice(formatTime.value, aimThing.value)
            await insertNoteBookData(
                {
                    name: aimThing.value,
                    type: thingType.value, // 后续转换成动态判断
                    date: formatTime.value,
                    // key: aimThing.value + formatTime.value
                    key: Math.random().toString(36).slice(2), // 设置生成唯一key值,该算法可能会有问题
                })
            const res = await getNoteBookData({
                pageNo: 1,
                pageSize: 10, 
            })
            tableData.value = res.data.pageData
            total.value = res.data.total
            commonEmit()
        }
    } catch (err: any) {
        message.error(`出错啦~${err}`)
        errorEmit()
    }
}
</script>

<template>
    <div class="canlender-style">
        <div class="set-time-style">
            <a-input v-model:value="aimThing" placeholder="请输入内容" class="aim-text-style" />
            <a-date-picker @change="onChange" />
            <a-time-picker v-model:value="strValue" value-format="HH:mm:ss" />
            <a-button type="primary" @click="sendPostData" class="test-font-style">确定</a-button>
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
        <!-- <div class="test-font-style">
            <a-button type="primary" @click="sendPostData">点击存储数据请求</a-button>
        </div> -->
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