/*
 * @Author: xie.yx yxxie@gk-estor.com
 * @Date: 2022-12-05 21:09:43
 * @LastEditors: xie.yx yxxie@gk-estor.com
 * @LastEditTime: 2023-01-06 23:59:01
 * @FilePath: /vue-admin-template/Users/popolun/test_folder/vue-element-admin/src/api/article.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/request'

// 获取入库单金额统计信息
export function getPurchasePriceStatistics(query) {
  return request({
    url: '/order/get_purchase_price_statistics',
    method: 'get',
    params: query
  })
}

// 获取入库单数量统计信息
export function getPurchasePieceStatistics(query) {
  return request({
    url: '/order/get_purchase_piece_statistics',
    method: 'get',
    params: query
  })
}

// 获取入库单总金额和总数量
export function getTotalPurchasePriceAndPiece(query) {
  return request({
    url: '/order/get_total_purchase_price_and_piece',
    method: 'get',
    params: query
  })
}

// 获取订货单列表
export function getPurchaseOrder(query) {
  return request({
    url: '/order/get_purchase_order',
    method: 'get',
    params: query
  })
}

// 新增一条订货单
export function addPurchaseOrder(data) {
  return request({
    url: '/order/add_purchase_order',
    method: 'post',
    data
  })
}

// 通过采购订单id获取所有的产品列表
export function getPurchaseProductDetails(query) {
  return request({
    url: '/order/get_purchase_product_details',
    method: 'get',
    params: query
  })
}

// 通过采购订单id删除该次进货订单
export function delPurchaseOrder(data) {
  return request({
    url: '/order/del_purchase_order',
    method: 'post',
    data
  })
}
