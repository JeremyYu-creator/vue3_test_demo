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

export interface channelList {
    comment: string,
    comment_id: string,
    date: string,
    img: string,
    intro: string,
    link: string,
    news_date: string,
    source: string,
    title: string,
    wap_title: string,
    type: string,
    mediaTypes: string,
}

// export interface childDataType {
//     total: number,
//     count: number,
//     list: listType
// }
export interface childDataCommon {
    total: number,
    count: number,
}
export interface childDataType extends childDataCommon {
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

export interface channelType {
    message: string,
    status: number,
    data: channelList,
    count: number,
}

export interface newsCommon {
    headers: headersType,
    status: number,
    statusText: string,
}

export interface newsType extends newsCommon {
    data: dataType,
}

export interface channelNewsType extends newsCommon {
    data: channelType
}

export default { newsType, channelNewsType }