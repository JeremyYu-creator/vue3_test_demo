export interface APIParams {
    results: number;
    page?: number;
    sortField?: string;
    sortOrder?: number;
    [key: string]: any;
}

export interface APIResult {
    results: {
        gender: 'female' | 'male';
        name: string;
        email: string;
    }[]
}
