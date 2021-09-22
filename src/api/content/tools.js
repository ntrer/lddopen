import request from '@/utils/request'

// 器材列表
export function productList(query) {
  return request({
    url: '/industry/ProvidersIndustryProduct/list',
    method: 'get',
    params: query
  })
}

// 器材数量
export function productCount(query) {
  return request({
    url: '/industry/ProvidersIndustryProduct/count',
    method: 'get',
    params: query
  })
}


// 新增器材
export function addProduct(data) {
  return request({
    url: '/industry/ProvidersIndustryProduct/',
    method: 'post',
    data: data
  })
}


// 编辑器材
export function editIndustryProduct(data) {
  return request({
    url: '/industry/ProvidersIndustryProduct/',
    method: 'put',
    data: data
  })
}

// 操作
export function ProductOppreate(query) {
  return request({
    url: '/industry/ProvidersIndustryProduct/oppreate',
    method: 'put',
    params: query
  })
}


// 回显
export function getIndustryProduct(providersProductId) {
  return request({
    url: '/industry/ProvidersIndustryProduct/' + providersProductId,
    method: 'get'
  })
}


// 新增厂商分类
export function industryClassification(query) {
  return request({
    url: '/industry/IndustryClassification/providers/list',
    method: 'get',
    params: query
  })
}

// 厂商列表
export function ManufactorList(query) {
  return request({
    url: '/industry/Manufactor/providers/list',
    method: 'get',
    params: query
  })
}





// 器材数据概览
export function dataOverviewTop(providersProductId) {
  return request({
    url: '/industry/ProvidersIndustryProduct/' + providersProductId,
    method: 'get'
  })
}


// 器材数据概览统计图
export function dataOverview(query) {
  return request({
    url: '/industry/ProvidersIndustryProduct/dataoverview',
    method: 'get',
    params: query
  })
}
