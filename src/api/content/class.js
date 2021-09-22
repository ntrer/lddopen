import request from '@/utils/request'

//获取课程列表
export function trainCourseList(query) {
  return request({
    url: '/train/ProvidersTrainCourse/list',
    method: 'get',
   params: query
  })
}


// 获取课程数量

export function trainCoursecount(query) {
  return request({
    url: '/train/ProvidersTrainCourse/count',
    method: 'get',
   params: query
  })
}



// 获取课程分类
export function trainClassificationList(query) {
  return request({
    url: '/train/TrainClassification/providers/list',
    method: 'get',
   params: query
  })
}


// 获取导师列表
export function trainTutorList(query) {
  return request({
    url: '/train/TrainTutor/providers/list',
    method: 'get',
   params: query
  })
}


 // 新增课程
export function addTrainCourse(data) {
  return request({
    url: '/train/ProvidersTrainCourse',
    method: 'post',
    data: data
  })
}



 // 操作
 export function TrainCourseOppreate(query) {
   return request({
     url: '/train/ProvidersTrainCourse/operation',
     method: 'put',
     params: query
   })
 }


// 回显
export function getTrainCourse(providersCourseId) {
  return request({
    url: '/train/ProvidersTrainCourse/' + providersCourseId,
    method: 'get'
  })
}


// 评论列表

export function CommentList(query) {
  return request({
    url: '/providers/user/Comment/list',
    method: 'get',
   params: query
  })
}


// 课时列表
export function TrainCourseList(query) {
  return request({
    url: '/train/ProvidersTrainCourse/class/hour/list',
    method: 'get',
   params: query
  })
}



// 订单列表
export function TrainCourseOrderList(query) {
  return request({
    url: '/train/ProvidersTrainCourse/order/list',
    method: 'get',
   params: query
  })
}

// 数据概览

export function dataOverviewTop(query) {
  return request({
   url: '/train/ProvidersTrainCourse/dataoverview',
    method: 'get',
   params: query
  })
}



 // 编辑课程
 export function editTrainCourse(data) {
   return request({
     url: '/train/ProvidersTrainCourse',
     method: 'put',
     data: data
   })
 }
