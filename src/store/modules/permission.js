/*
 * @Author: xie.yx yxxie@gk-estor.com
 * @Date: 2022-12-05 21:09:43
 * @LastEditors: xie.yx yxxie@gk-estor.com
 * @LastEditTime: 2023-02-23 17:16:51
 * @FilePath: /order_system_vue/src/store/modules/permission.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { asyncRoutes, constantRoutes } from '@/router'

// const asyncRoutes = [
//   // 异步路由
//   {
//     path: '/permission',
//     component: 'Layout',
//     redirect: '/permission/page',
//     alwaysShow: true, // will always show in the root menu
//     name: 'Permission',
//     meta: {
//       title: '权限控制',
//       icon: 'lock',
//       roles: ['admin', 'editor'] // you can set roles in root nav
//     },
//     children: [
//       {
//         path: 'menu',
//         component: '/views/permission/menu',
//         name: 'MenuPermission',
//         meta: {
//           title: '菜单权限',
//           roles: ['admin']
//         }
//       },
//       {
//         path: 'role',
//         component: '/views/permission/role',
//         name: 'RolePermission',
//         meta: {
//           title: '角色权限',
//           roles: ['admin']
//         }
//       }
//     ]
//   },

//   // 就是没匹配上的都进入 404 路由，并且404页面只能放到最下面
//   { path: '*', redirect: '/404', hidden: true }
// ]

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
