import { get } from "@/utils/request";
import { APIParams, APIResult } from '@/typing/tableRequest'

export const getTableData = (params: { apikey: string }) => {
    // return get<APIResult>(
    //     '/api',
    //     {params},
    // )
    return get(
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