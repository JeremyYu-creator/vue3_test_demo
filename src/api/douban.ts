import { get } from '@/utils/request'
import { wmdbResponse, topRequestParams, detailMovieRequest, detailMovieMessage } from '@/typing/newMovieData'

/**
 * 获取到豆瓣排名的电影
 * **/
export const getDoubanNewData = (params: topRequestParams) => {
    return get<wmdbResponse>(
        '/api/api/v1/top',
        { params }
    )
}


/**
 * 获取到电影详细信息
 * **/
export const getDoubanDetail = (params: detailMovieRequest) => {
    return get<detailMovieMessage>(
        '/api/movie/api',
        { params }
    )
}


export default { getDoubanNewData, getDoubanDetail }