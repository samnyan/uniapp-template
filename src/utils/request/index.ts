type responseType = {
  code: number
  success: boolean
  msg: string
  result: any
}

const request = <T>(config: UniApp.RequestOptions) => {
  let url: string
  if (/^(http|https):\/\/.*/.test(config.url)) {
    // 如果是以http/https开头的则不添加VITE_REQUEST_BASE_URL
    url = config.url
  } else {
    url = import.meta.env.VITE_REQUEST_BASE_URL + config.url
  }
  return new Promise<T>((resolve, reject) => {
    uni.request({
      ...config,
      url,
      /** 统一设置超时时间 */
      timeout: config.timeout || 60000,
      header: {
        ...config.header,
        /** 统一报文格式 */
        'Content-Type': 'application/json;charset=UTF-8',
        /** 统一身份认证 */
        // Authorization: Token
      },
      success(res) {
        // 200状态码表示成功
        if (res.statusCode === 200) {
          resolve(res.data as any)
          return
        }
        /**
         * 这里可以做一些登录超时/接口异常提示等处理
         */
        reject(res.data)
      },
      fail(result) {
        reject(result)
      },
    })
  })
}

export default {
  /**
   * get请求
   * @param url 请求地址
   * @param data 请求的参数
   * @param options 其他请求配置
   */
  get: <T>(url: string, data?: UniApp.RequestOptions['data'], options?: UniApp.RequestOptions) => request<T>({
    ...options,
    url,
    data,
    method: 'GET',
  }),
  /**
   * post请求
   * @param url 请求地址
   * @param data 请求的参数
   * @param options 其他请求配置
   */
  post: <T>(url: string, data?: UniApp.RequestOptions['data'], options?: UniApp.RequestOptions) => request<T>({
    ...options,
    url,
    data,
    method: 'POST',
  }),
}
