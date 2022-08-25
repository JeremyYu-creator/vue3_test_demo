export interface listType {
    URL: string,
    cTime: string,
    comment: string,
    commentid: string,
    source: string,
    summary: string,
    title: string,
    type: string,
    _id: string,
    allPics: {
        total: number,
        pics: {
            imgUrl: string,
            isCover: boolean,
            note: string,
        }[]
    }
}

export interface childDataType {
    total: number,
    count: number,
    list: listType
}

export interface resultType {
    data: childDataType,
    status: {
        code: number,
        msg: string,
    }
}

export interface dataType {
    result: resultType,
}

export interface headersType {
    date: string,
    server: string,
    vary: string,
    backend: string
}

export interface newsType {
    data: dataType,
    headers: headersType,
    status: number,
    statusText: string,
}

export default { newsType }