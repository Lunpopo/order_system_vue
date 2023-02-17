/*
 * @Author: xie.yx yxxie@gk-estor.com
 * @Date: 2022-12-05 21:09:43
 * @LastEditors: xie.yx yxxie@gk-estor.com
 * @LastEditTime: 2023-01-06 16:33:25
 * @FilePath: /vue-admin-template/Users/popolun/test_folder/vue-element-admin/src/api/article.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/request'

// 获取经销商产品列表
export function getDealerProductList(query) {
  return request({
    url: '/data/get_dealer_product_data',
    method: 'get',
    params: query
  })
}

// 获取所有的经销商产品列表（用于下载数据）
export function getAllDealerProduct(query) {
  return request({
    url: '/data/get_all_dealer_product_data',
    method: 'get',
    params: query
  })
}

// 获取经销商的名单列表
export function getDealerList() {
  return request({
    url: '/data/get_dealer_list',
    method: 'get'
  })
}

// 新增经销商产品
export function addDealerProduct(params) {
  return request({
    url: '/data/add_dealer_product',
    method: 'post',
    params,
    data: params.image
  })
}

// 更新经销商产品
export function updateDealerProduct(params) {
  return request({
    url: '/data/update_dealer_product',
    method: 'post',
    params,
    data: params.image
  })
}

// 删除经销商产品
export function deleteDealerProduct(data) {
  return request({
    url: '/data/delete_dealer_product',
    method: 'post',
    data
  })
}

// 批量删除经销商产品
export function dealerProductMultiDelete(data) {
  return request({
    url: '/data/dealer_product_multi_delete',
    method: 'post',
    data
  })
}

// 搜索经销商产品
export function searchDealerProduct(query) {
  return request({
    url: '/data/search_dealer_product',
    method: 'get',
    params: query
  })
}
