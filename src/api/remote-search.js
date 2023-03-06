import request from '@/utils/request'

// 获取交易信息api
export function transactionList(query) {
  return request({
    url: '/order/get_transaction_list',
    method: 'get',
    params: query
  })
}
