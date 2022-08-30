
export type imgData = {
    small: string,
    medium: string,
    large: string,
}

export type peopleData = {
    alt: string,
    id: string,
    name: string,
    name_en: string,
    avatars: imgData,
}[]

export type ratingData = {
    max: number,
    min: number,
    stars: string,
    average: number,
    // details
}

export type subjectsData = {
    alt: string,
    collect_count: number,
    has_video: boolean,
    id: string,
    genres: string[],
    original_title: string,
    subtype: string,
    year: string,
    title: string,
    pubdates: string[],
    durations: string[],
    rating: ratingData,
    directors: peopleData,
    images: imgData,
    pubdates: string[],
    casts: peopleData,
}[]


export type movieData = {
    subjects: subjectsData,
    title: string,
}