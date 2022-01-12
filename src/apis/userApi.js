import ajax from './ajax'

// 用户登录
export function loginApi (data) {
  return ajax({
    url: '/user/login',
    method: 'POST',
    data
  })
}

// 用户列表（分页）
export function userListApi (params) {
  return ajax({
    url: '/user/info/list',
    params
  })
}

// 查看单个用户信息
export function getUserInfo (params) {
  return ajax({
    url: '/user/' + params,
    params
  })
}

// 删除用户
export function delUser (data) {
  return ajax({
    url: '/user/' + data,
    method: 'DELETE'
  })
}

// 添加用户
export function addUserData (data) {
  return ajax({
    url: '/user/save',
    method: 'POST',
    data
  })
}

// 修改用户
export function updatedUserData (data) {
  return ajax({
    url: '/user/' + data.id,
    method: 'PUT',
    data
  })
}

// 获取部门信息
export function getDeptInfo () {
  return ajax({
    url: '/user/dept/info'
  })
}

// 获取权限信息
export function getRoleInfo () {
  return ajax({
    url: '/role'
  })
}

// 获取权限列表
export function getRoleList () {
  return ajax({
    url: '/role'
  })
}

// 获取所有权限菜单
export function getRoleMenuInfo () {
  return ajax({
    url: '/menu/list'
  })
}

// 获取地址信息
export function getAddressInfo () {
  return ajax({
    url: '/address'
  })
}
