import { get } from "@/utils/request";
import { APIParams, APIResult } from '@/typing/tableRequest'
import { movieData } from '@/typing/movie'

export const getTableData = (params: { apikey: string }) => {
    // return get<APIResult>(
    //     '/api',
    //     {params},
    // )
    return get<movieData>(
        '/v2/movie/new_movies',
        { params }
    )
}
export const getTableMockData = (params: APIParams) => {
    return get<APIResult>(
        '/api',
        { params },
    )
}
export default { getTableData, getTableMockData }