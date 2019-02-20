import _ from 'axios'

export namespace API {
  export const baseURL = 'https://www.luogu.org'
  export const apiURL = '/api'
  export const SEARCH_PROBLEM = (pid: string) => API.apiURL + '/problem/detail' + `/${pid}`
  export const ACCESS_TOKEN = '/OAuth2/accessToken'
}

export const axios = _.create({
  baseURL: API.baseURL
})

export const searchProblem = async (pid: string) =>
  axios.get(API.SEARCH_PROBLEM(pid))
    .then(res => res.data.data || null)

export const OAUTH2_INFO = {
  grant_type: 'password',
  client_id: 'luogu-vscode',
  client_secret: 'Asdf1234Excited111'
}

export const login = async (username: string, password: string) =>
  axios.post(API.ACCESS_TOKEN, {
    OAUTH2_INFO,
    username,
    password
  }).then(res => res.data || null)

export default axios
