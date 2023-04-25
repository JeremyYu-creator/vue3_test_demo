interface StringIndexedObject {
    [key: string]: string;
}
interface DataItem  {
    name: string,
    date: string,
    type: string,
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
interface NoteBookCommonParams {
    name: string,
    type: string,
    date: string,
    key: string
}

type NoteBookReturnData = {
    pageData: NoteBookCommonParams[],
    total: number,
}

interface NoteBookRequestParams {
    data: NoteBookReturnData,
    code: number
}

type NoteBookMittType = NoteBookReturnData & {
    current: number,
}

interface OperateNoteBookType {
    data: string,
    code: number,
}


export { NoteBookCommonParams, NoteBookRequestParams, StringIndexedObject, LunarChineseYear, NoteBookMittType, OperateNoteBookType, DataItem}