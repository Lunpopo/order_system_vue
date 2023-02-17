/*
 * @Author: xie.yx yxxie@gk-estor.com
 * @Date: 2022-12-05 21:09:43
 * @LastEditors: xie.yx yxxie@gk-estor.com
 * @LastEditTime: 2023-01-10 16:39:07
 * @FilePath: /vue-element-admin/src/router/modules/table.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/** When your routing table is too long, you can split it into small modules **/
import Layout from '@/layout'

const tableRouter = {
  path: '/product',
  component: Layout,
  redirect: '/table/myself-price-list',
  name: 'Product',
  meta: {
    title: '货单表格',
    icon: 'table'
  },
  children: [
    {
      path: 'complex-table',
      component: () => import('@/views/product/myself-price-list'),
      name: 'ComplexTable',
      meta: { title: '自己的货单表格', icon: 'tab' }
    },
    {
      path: 'inline-edit-table',
      component: () => import('@/views/product/dealer-price-list'),
      name: 'InlineEditTable',
      meta: { title: '经销商产品价格表', icon: 'tab' }
    }
  ]
}
export default tableRouter
