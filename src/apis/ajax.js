import Axios from 'axios'
import store from '../store'

const Ajax = Axios.create({
  timeout: 5000,
  baseURL: '/apis'
})

Ajax.interceptors.request.use(function (config) {
  const token = store.getters['common/token']

  if (config.url !== '/user/login') {
    if (token) {
      config.headers.token = token
      return config
    } else {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject({ code: 400, message: 'token数据已丢失，请重新登录' })
    }
  } else {
    return config
  }
})

export default function (req) {
  if (!req || req.constructor !== Object) throw new Error('请求数据请传入参数')
  if (!req.url) throw new Error('调用异步请求方法，url地址为必须参数')
  return new Promise(resolve => {
    Ajax.request({
      url: req.url,
      method: req.method || 'GET',
      data: req.data || {},
      params: req.params || {}
    }).then(function ({ data }) {
      resolve(data)
    }).catch(function (e) {
      resolve(e)
    })
  })
}
