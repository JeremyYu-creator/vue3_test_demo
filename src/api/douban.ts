import { get } from '@/utils/request'
import { wmdbResponse, topRequestParams } from '@/typing/newMovieData'

/**
 * 获取到豆瓣排名的电影
 * **/
export const getDoubanNewData = (params: topRequestParams) => {
    return get<wmdbResponse>(
        '/api/api/v1/top',
        { params }
    )
}


export default { getDoubanNewData }