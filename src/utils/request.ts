import { httpResponse } from "@/typing/request";
import axios, { AxiosRequestConfig } from "axios";

const instance = axios.create({
  timeout: 3000 * 60, // 请求超时时间
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => Promise.reject(err)
);
export const send = async <T>(
  config: AxiosRequestConfig,
  code = 0,
  preventFilter = false
) => {
  const res = (await instance(config)) as unknown as httpResponse<T>;
  // && res.retcode !== code
  if (!preventFilter) {
    return Promise.reject(res);
  } else if (preventFilter) {
    return res as unknown as T;
  }
  return res.object;
};
export const get = async <T>(
  url: string,
  config?: AxiosRequestConfig,
  code = 0,
  preventFilter = false
): Promise<T> => {
  return send(
    {
      ...config,
      url,
      method: "GET",
    },
    code,
    preventFilter
  );
};

export const post = async <T>(
  url: string,
  data: unknown,
  config?: AxiosRequestConfig,
  code = 0,
  preventFilter = false
): Promise<T> => {
  return send(
    {
      ...config,
      url,
      method: "POST",
      data,
    },
    code,
    preventFilter
  );
};
export const put = async <T>(
  url: string,
  data: unknown,
  config?: AxiosRequestConfig,
  code = 0,
  preventFilter = false
): Promise<T> => {
  return send(
    {
      ...config,
      url,
      method: "PUT",
      data,
    },
    code,
    preventFilter
  );
};