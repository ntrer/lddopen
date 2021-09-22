import request from '@/utils/request'

// 导师列表
export function TrainTutorList(query) {
  return request({
    url: '/train/ProvidersTrainTutor/list',
    method: 'get',
    params: query
  })
}

// 导师数量
export function TrainTutorCount(query) {
  return request({
    url: '/train/ProvidersTrainTutor/count',
    method: 'get',
    params: query
  })
}


// 新增导师
export function addTrainTutor(data) {
  return request({
    url: '/train/ProvidersTrainTutor/',
    method: 'post',
    data: data
  })
}


// 编辑导师
export function editTrainTutor(data) {
  return request({
    url: '/train/ProvidersTrainTutor/',
    method: 'put',
    data: data
  })
}

// 操作
export function trainTutorOppreate(query) {
  return request({
    url: '/train/ProvidersTrainTutor/oppreate',
    method: 'put',
    params: query
  })
}


// 回显
export function getTrainTutor(providersTutorId) {
  return request({
    url: '/train/ProvidersTrainTutor/' + providersTutorId,
    method: 'get'
  })
}


export function dataoverview(query) {
  return request({
    url: '/train/ProvidersTrainTutor/dataoverview',
    method: 'get',
    params: query
  })
}

// 导师订单列表
export function TutororderList(query) {
  return request({
    url: '/train/ProvidersTrainTutor/orderList',
    method: 'get',
    params: query
  })
}

// 课程列表
export function TutorcourseList(query) {
  return request({
    url: '/train/ProvidersTrainTutor/courseList',
    method: 'get',
    params: query
  })
}
