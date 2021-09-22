import request from '@/utils/request'

export function serialNumberList(query) {
  return request({
    url: '/providers/finance/SerialNumber/list',
    method: 'get',
   params: query
  })
}



export function serialNumberDetails(query) {
  return request({
    url: '/providers/finance/SerialNumber/details',
    method: 'get',
   params: query
  })
}



// 结算记录
export function settlementList(query) {
  return request({
    url: '/providers/finance/settlement/list',
    method: 'get',
   params: query
  })
}

// 结算详情
export function settlementDetails(query) {
  return request({
    url: '/providers/finance/settlement/details',
    method: 'get',
   params: query
  })
}





// 导出结算
export function exportFinance(query) {
  return request({
    url: '/providers/finance/settlement/export',
    method: 'get',
    params: query
  })
}

// 导出流水
export function exportSerialNumber(query) {
  return request({
    url: '/providers/finance/SerialNumber/export',
    method: 'get',
    params: query
  })
}


// 资金账户信息
export function accountInfo(query) {
  return request({
    url: '/providers/finance/settlement/account/info',
    method: 'get',
    params: query
  })
}


// 设置银行账户信息获取验证码
export function sendBankSms(data) {
  return request({
    url: '/system/VerificationCodeRecord/set/bank/sms/send',
    method: 'post',
    data: data
  })
}

// 设置账户银行号信息
export function setbankCardInfo(data) {
  return request({
    url: '/providers/finance/settlement/set/bankCardInfo',
     method: 'put',
    data: data
  })
}
