export interface httpResponse<T> {
    /**
    * 状态码，通常0表示成功
    */
    // retcode: number,
    status: number,
    /**
     * 返回主体，可能包含各种类型
     * T 作为一个泛型，指代了各种类型
     * object/data的话需要根据实际去选择，由于本项目不是正常的后端返回，因此可能数据是在object里、也可能在data里
     */
    object: T,
    data: T,
    /**
     * 返回的文本信息
     */
    retdesc: string,
    statusText: string,
    /**
     * 返回时间
     */
    currentTime: string
}