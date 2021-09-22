import request from '@/utils/request'


export function allread(query) {
  return request({
    url: '/providers/user/Message/batch/read',
     method: 'put',
   params: query
  })
}


//获取消息列表
export function messageList(query) {
  return request({
    url: '/providers/user/Message/list',
    method: 'get',
   params: query
  })
}

// 获取详情
export function messageDetail(query) {
  return request({
    url: '/providers/user/Message/detail',
    method: 'get',
   params: query
  })
}


// 删除消息
export function messageRemove(query) {
  return request({
    url: '/providers/user/Message/remove',
    method: 'delete',
     params: query
  })
}
