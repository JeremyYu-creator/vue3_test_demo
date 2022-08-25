export interface APIParams {
    results: number;
    page?: number;
    sortField?: string;
    sortOrder?: number;
    [key: string]: any;
    noinfo?: string;
}

export interface APIResult {
    results: {
        gender: 'female' | 'male';
        name: string;
        email: string;
    }[]
}
