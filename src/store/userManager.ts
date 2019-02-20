export const type = {
  USER_LOGOUT: Symbol('user-logout'),
  USER_LOGIN: Symbol('user-login')
}

export function loginUser () {
  return {
    type: type.USER_LOGIN
  }
}

export function logoutUser () {
  return {
    type: type.USER_LOGOUT
  }
}
