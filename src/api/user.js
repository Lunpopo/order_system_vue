/*
 * @Author: xie.yx yxxie@gk-estor.com
 * @Date: 2022-12-05 21:09:43
 * @LastEditors: xie.yx yxxie@gk-estor.com
 * @LastEditTime: 2023-02-20 15:42:57
 * @FilePath: /vue-element-admin/src/api/user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/request'

// 登录
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

// 获取用户token
export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}
