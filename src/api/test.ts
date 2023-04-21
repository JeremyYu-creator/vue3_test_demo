import { get, post } from "@/utils/request";
import { NoteBookRequestParams, OperateNoteBookType } from '@/typing/noteBook'
export const testRequest = (params: {pageNo: number, pageSize: number,start: number, end: number, sort: boolean}) => {
    return get<any>(
        '/mynode/home',
        { params },
        200
    )
}
export const getNoteBookData = (params: {}) => {
    return get<NoteBookRequestParams>(
        '/mynode/noteBook',
        { params },
        200
    )
}
export const insertNoteBookData = (data: any) => {
    return post<OperateNoteBookType>(
        '/mynode/change',
        data,
        data,
        200,
    )
}
export const deleteNoteBookData = (data: any) => {
    return post<OperateNoteBookType>(
        '/mynode/delete',
        data,
        data,
        200,
    )
}
export const updateNoteBookData = (data: any) => {
    return post<OperateNoteBookType>(
        '/mynode/update',
        data,
        data,
        200,
    )
}
export default { testRequest, getNoteBookData, insertNoteBookData, deleteNoteBookData, updateNoteBookData }