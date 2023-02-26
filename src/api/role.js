import request from '@/utils/request'

/**
 * 返回所有的路由（菜单/api）
 * @returns
 */
export function getRoutes() {
  return request({
    url: '/user/routes',
    method: 'get'
  })
}

/**
 * 返回角色所对应的路由（菜单/api）
 * @returns
 */
export function getRoutesByRole(query) {
  return request({
    url: '/user/get_routes_by_role',
    method: 'get',
    params: query
  })
}

export function getRoles() {
  return request({
    url: '/user/roles',
    method: 'get'
  })
}

// 新增用户组
export function addRole(data) {
  return request({
    url: '/user/add_role',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return request({
    url: `/vue-element-admin/role/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(data) {
  return request({
    url: `/user/delete_role`,
    method: 'post',
    data
  })
}
