import { get } from "@/utils/request";

// col表示新闻类别
// 国内：56261
// 国际：56262
// 社会：56264
// 历史：97223
export const getAllNews = (params: { page: number, col?: number }) => { // 获取全部新闻信息
    return get(
        '/dfz/outside/wap/news/list.d.html',
        {params},
        0,
        true,
    )
}

// ch:"ent"娱乐/"sports"运动/"tech"科技 渠道码不同途径
export const getChannelNews = (params: {page: number,  show_num: number,
    ch: string;}) => {
    return get(
        '/ent/feed.d.json',
        {params},
        0,
        true,
    )
}

export default { getAllNews, getChannelNews }