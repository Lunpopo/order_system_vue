/*
 * @Author: xie.yx yxxie@gk-estor.com
 * @Date: 2022-12-05 21:09:43
 * @LastEditors: xie.yx yxxie@gk-estor.com
 * @LastEditTime: 2023-01-04 17:31:41
 * @FilePath: /vue-element-admin/src/api/user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/request'

export function login(data) {
  // 登录
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  // 获取用户token
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}
