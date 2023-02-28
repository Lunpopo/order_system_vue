import request from '@/utils/request'

export function searchUser(name) {
  return request({
    url: '/vue-element-admin/search/user',
    method: 'get',
    params: { name }
  })
}

// 获取交易信息api
export function transactionList(query) {
  return request({
    url: '/order/get_transaction_list',
    method: 'get',
    params: query
  })
}
