import request from '@/utils/request'

export function statistics(data) {
  return request({
    url: '/provider/overview/data/statistics',
    method: 'get',
    data: data
  })
}


export function chartStatistics(data) {
  return request({
    url: '/provider/overview/chart/statistics',
    method: 'get',
    params: data
  })
}


export function latelyeditList(data) {
  return request({
    url: '/provider/overview/latelyedit/list',
    method: 'get',
    data: data
  })
}


// 修改密码
export function resetPassword(data) {
  return request({
    url: '/system/user/update/providers/Password',
    method: 'put',
    data: data
  })
}


// 意见反馈
export function feedback(data) {
  return request({
    url: '/providers/user/Message/feedback/add',
    method: 'post',
    data: data
  })
}




export function beforeSend(data) {
  return request({
    url: '/system/VerificationCodeRecord/update/before/sms/send',
    method: 'post',
    data: data
  })
}


export function beforeUpdate(data) {
  return request({
    url: '/system/VerificationCodeRecord/update/before/code/ver',
    method: 'post',
    data: data
  })
}

export function afterSend(data) {
  return request({
    url: '/system/VerificationCodeRecord/update/after/sms/send',
    method: 'post',
    data: data
  })
}



export function afterUpdate(data) {
  return request({
    url: '/system/VerificationCodeRecord/update/after/code/ver',
    method: 'post',
    data: data
  })
}
