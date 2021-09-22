import request from '@/utils/request'

export function manufactorList(query) {
  return request({
    url: '/industry/ProvidersManufactor/list',
    method: 'get',
    params: query
  })
}



// 操作按钮
export function manufactorOppreate(query) {
  return request({
    url: '/industry/ProvidersManufactor/oppreate',
    method: 'put',
    params: query
  })
}


// 新增厂商
export function addManufactor(data) {
  return request({
    url: '/industry/ProvidersManufactor',
    method: 'post',
    data: data
  })
}



// 获取厂商详情
export function getManufactor(providersManufactorId) {
  return request({
    url: '/industry/ProvidersManufactor/' + providersManufactorId,
    method: 'get'
  })
}




// 编辑厂商
export function editManufactor(data) {
  return request({
    url: '/industry/ProvidersManufactor',
    method: 'put',
    data: data
  })
}



// 数据概览统计图
export function dataOverview(query) {
  return request({
    url: '/industry/ProvidersManufactor/dataoverview',
    method: 'get',
    params: query
  })
}
