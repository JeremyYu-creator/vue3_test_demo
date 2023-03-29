import { get, post } from "@/utils/request";
// import { APIParams, APIResult } from '@/typing/tableRequest'
// import { movieData } from '@/typing/movie'

// export const getTableData = (params: { apikey: string }) => {
//     // return get<APIResult>(
//     //     '/api',
//     //     {params},
//     // )
//     return get<movieData>(
//         '/v2/movie/new_movies',
//         //'/wmdb/movie/new_movies',
//         { params }
//     )
// }
// export const getTableMockData = (params: APIParams) => {
//     return get<APIResult>(
//         '/api',
//         { params },
//     )
// }
export const testRequest = (params: {pageNo: number, pageSize: number,start: number, end: number, sort: boolean}) => {
    return get<any>(
        '/mynode/home',
        { params },
        200
    )
}
export const getNoteBookData = (params: {}) => {
    return get<any>(
        '/mynode/noteBook',
        { params },
        200
    )
}
export const insertNoteBookData = (data: any) => {
    return post<any>(
        '/mynode/change',
        data,
        data,
        200,
    )
}
export const deleteNoteBookData = (data: any) => {
    return post<any>(
        '/mynode/delete',
        data,
        data,
        200,
    )
}
export const updateNoteBookData = (data: any) => {
    return post<any>(
        '/mynode/update',
        data,
        data,
        200,
    )
}
export default { testRequest, getNoteBookData, insertNoteBookData, deleteNoteBookData, updateNoteBookData }