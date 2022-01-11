import ajax from './ajax'

// 获取商品列表
export function getProductList (params) {
  return ajax({
    url: '/product/list',
    params
  })
}
