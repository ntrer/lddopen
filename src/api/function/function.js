import request from '@/utils/request'

export function orderList(query) {
  return request({
    url: '/providers/user/Order/list',
    method: 'get',
   params: query
  })
}


export function orderDetail(query) {
  return request({
   url: '/providers/user/Order/details',
   method: 'get',
   params: query
  })
}


export function commentList(query) {
  return request({
   url: '/providers/user/Comment/list',
   method: 'get',
   params: query
  })
}


// 导出订单
export function exportOrder(query) {
  return request({
    url: '/providers/user/Order/export',
    method: 'get',
    params: query
  })
}


