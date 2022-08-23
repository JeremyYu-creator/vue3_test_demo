export interface httpResponse<T> {
     /**
     * 状态码，通常0表示成功
     */
    retcode: number,
    /**
     * 返回主体，可能包含各种类型
     * T 作为一个泛型，指代了各种类型
     */
    object: T,
    /**
     * 返回的文本信息
     */
    retdesc: string,
    /**
     * 返回时间
     */
    currentTime: string
}