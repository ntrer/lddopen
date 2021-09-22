import request from '@/utils/request'



// 获取评论数量
export function commentCount(query) {
  return request({
    url: '/providers/user/Comment/count',
    method: 'get',
    params: query
  })
}



// 获取评论列表
export function commentList(query) {
  return request({
    url: '/providers/user/Comment/list',
    method: 'get',
    params: query
  })
}


// 查看评论回复
export function commentReply(query) {
  return request({
    url: '/providers/user/Comment/reply',
    method: 'get',
    params: query
  })
}


// 提交回复
export function submitReply(data) {
  return request({
    url: '/providers/user/Comment/submit/reply',
    method: 'post',
    data: data
  })
}


// 商品列表
export function providersList(query) {
  return request({
    url: '/train/TrainCourse/providers/list',
    method: 'get',
    params: query
  })
}
