import request from '@/utils/request'

export function posterList(query) {
  return request({
    url: '/activity/ProvidersPoster/list',
    method: 'get',
   params: query
  })
}


export function posterCount(query) {
  return request({
   url: '/activity/ProvidersPoster/count',
   method: 'get',
   params: query
  })
}



// 获取海报分类
export function PosterClassification(query) {
  return request({
   url: '/activity/PosterClassification/providers/list',
   method: 'get',
   params: query
  })
}
export function activityProvidersPoster(query,aid) {
  return request({
   url: '/activity/ProvidersPoster/'+ aid,
   method: 'get',
   params: query
  })
}
export function ProvidersPosterdataoverview(query) {
  return request({
   url: '/activity/ProvidersPoster/dataoverview',
   method: 'get',
   params: query
  })
}

export function ProvidersPosteroperation(query) {
  return request({
   url: '/activity/ProvidersPoster/operation',
   method: 'put',
   params: query
  })
}

export function ProvidersPosterorderlist(query) {
  return request({
   url: '/activity/ProvidersPoster/order/list',
   method: 'get',
   params: query
  })
}

export function ProvidersPosterposterformatlist(query) {
  return request({
   url: '/activity/ProvidersPoster/poster/format/list',
   method: 'get',
   params: query
  })
}

//活动方案
export function activityProvidersActivityProgramList(query) {
  return request({
    url: '/activity/ProvidersActivityProgram/list',
    method: 'get',
   params: query
  })
}
export function activityProvidersActivityProgramcount(query) {
  return request({
   url: '/activity/ProvidersActivityProgram/count',
   method: 'get',
   params: query
  })
}


export function posterProvidersActivityProgramCount(query) {
  return request({
   url: '/activity/ProvidersActivityProgram/count',
   method: 'get',
   params: query
  })
}
export function activityProvidersActivityProgram(query,aid) {
  return request({
   url: '/activity/ProvidersActivityProgram/'+ aid,
   method: 'get',
   params: query
  })
}


export function activityProvidersActivityProgramoperation(query) {
  return request({
   url: '/activity/ProvidersActivityProgram/operation',
   method: 'put',
   params: query
  })
}



// 新增海报
export function addPoster(data) {
  return request({
    url: '/activity/ProvidersPoster',
    method: 'post',
    data: data
  })
}


// 获取厂商详情
export function getPoster(providersPosterId) {
  return request({
    url: '/activity/ProvidersPoster/' + providersPosterId,
    method: 'get'
  })
}


// 编辑海报
export function editPoster(data) {
  return request({
    url: '/activity/ProvidersPoster',
    method: 'put',
    data: data
  })
}


// 获取活动分类
export function ActivityProgramClassification(query) {
  return request({
   url: '/activity/ActivityProgramClassification/providers/list',
   method: 'get',
   params: query
  })
}

// 海报列表
export function providersPosterList(query) {
  return request({
   url: '/activity/Poster/providers/list',
   method: 'get',
   params: query
  })
}


// 新增活动
export function addActivityProgram(data) {
  return request({
    url: '/activity/ProvidersActivityProgram',
    method: 'post',
    data: data
  })
}


// 编辑活动
export function editActivityProgram(data) {
  return request({
    url: '/activity/ProvidersActivityProgram',
    method: 'put',
    data: data
  })
}

// 获取活动详情
export function getActivityProgram(providersActivityProgramId) {
  return request({
    url: '/activity/ProvidersActivityProgram/' + providersActivityProgramId,
    method: 'get'
  })
}

// 活动数据概览
export function dataOverviewTop(query) {
  return request({
   url: '/activity/ProvidersActivityProgram/dataoverview',
    method: 'get',
   params: query
  })
}



 // 操作
 export function ActivityOppreate(query) {
   return request({
     url: '/activity/ProvidersActivityProgram/operation',
     method: 'put',
     params: query
   })
 }


// 订单列表
export function ActivityProgramOrderList(query) {
  return request({
    url: '/activity/ProvidersActivityProgram/order/list',
    method: 'get',
   params: query
  })
}

// 方案列表
export function ActivityProgramFileList(query) {
  return request({
    url: '/activity/ProvidersActivityProgram/file/list',
    method: 'get',
   params: query
  })
}
