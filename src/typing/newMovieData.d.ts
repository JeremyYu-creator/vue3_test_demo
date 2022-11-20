export interface errorText {
    code: string,
    message: string,
    response: {
        data: string
    }
}

export interface topRequestParams {
    type: string,
    skip: number,
    limit: number,
    lang: string
}

export interface detailMovieRequest {
    id: string
}

export type movieDataType = {
    createdAt: number,
    updatedAt: number,
    id: string,
    poster: string,
    name: string,
    genre: string,
    description: string,
    language: string,
    country: string,
    lang: string,
    shareImage?: string,
    movie: string,
}[]

export type writerData = {
    createdAt: number,
    updatedAt: number,
    id: string,
    name: string,
    lang: string,
    person: string
}[]

export type commonType = {
    createdAt: number,
    updatedAt: number,
    id: string,
    data: writerData
}[]

export type detailMovieMessage = {
    data: movieDataType,
    writer: commonType,
    actor: commonType,
    director: commonType,
    createdAt: number,
    updatedAt: number,
    id: string,
    originalName: string,
    imdbVotes: number,
    imdbRating: string,
    rottenVotes: number,
    year: string,
    imdbId: string,
    alias: string,
    doubanId: string,
    type: string,
    doubanVotes: number,
    doubanRating: string,
    duration: number,
    episodes: number,
    totalSeasons: number,
    dateReleased: string,
    artRatings: number,
    actorRatings: number,
    soundRatings: number,
    storyRatings: number,
    enjoymentRatings: number,
    totalVotes: number,
}

export type wmdbSubData = {
    createAt: string,
    updatedAt: string,
    id: string,
    poster: string,
    name: string,
    genre: string,
    description: string,
    language: string,
    country: string,
    lang: string,
    shareImage: string,
    movie: string,
}[]

export type wmdbResponse = {
    data: wmdbSubData,
    createAt: string,
    updatedAt: string,
    id: string,
    originalName: string,
    imdbVotes: number,
    imdbRating: string,
    rottenRating: string,
    rottenVotes: number,
    year: string,
    imdbId: string,
    alias: string,
    doubanId: string,
    type: string,
    doubanRating: string,
    doubanVotes: number,
    duration: number,
    dateReleased: string
}[]

export default { wmdbSubData, wmdbResponse, topRequestParams, detailMovieRequest, detailMovieMessage }