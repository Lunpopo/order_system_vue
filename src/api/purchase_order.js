/*
 * @Author: xie.yx yxxie@gk-estor.com
 * @Date: 2023-02-28 17:17:55
 * @LastEditors: xie.yx yxxie@gk-estor.com
 * @LastEditTime: 2023-06-26 14:15:08
 * @FilePath: /order_system_vue/src/api/purchase_order.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/request'

// 获取入库单金额统计信息
export function getPurchasePriceStatistics(query) {
  return request({
    url: '/order_statistics/get_purchase_price_statistics',
    method: 'get',
    params: query
  })
}

// 获取入库单数量统计信息
export function getPurchasePieceStatistics(query) {
  return request({
    url: '/order_statistics/get_purchase_piece_statistics',
    method: 'get',
    params: query
  })
}

// 获取入库单总金额和总数量
export function getTotalPurchasePriceAndPiece(query) {
  return request({
    url: '/order_statistics/get_total_purchase_price_and_piece',
    method: 'get',
    params: query
  })
}

// 获取入库单列表
export function getPurchaseOrder(query) {
  return request({
    url: '/purchase_order/get_purchase_order',
    method: 'get',
    params: query
  })
}

// 新增一条入库单
export function addPurchaseOrder(data) {
  return request({
    url: '/purchase_order/add_purchase_order',
    method: 'post',
    data
  })
}

// 更新入库单信息
export function updatePurchaseOrder(data) {
  return request({
    url: '/purchase_order/update_purchase_order',
    method: 'post',
    data
  })
}

// 通过入库单id获取所有的产品列表
export function getPurchaseProductDetails(query) {
  return request({
    url: '/purchase_order/get_purchase_product_details',
    method: 'get',
    params: query
  })
}

// 通过入库单id删除该次进货订单
export function delPurchaseOrder(data) {
  return request({
    url: '/purchase_order/del_purchase_order',
    method: 'post',
    data
  })
}
