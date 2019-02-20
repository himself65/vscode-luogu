import _ from 'axios'

export const axios = _.create({
  baseURL: 'https://luogu.org'
})

const baseURL = 'https://luogu.org'
const apiBaseURL = baseURL + '/api'
export const API = {
  SEARCH_PROBLEM: (pid: string) => apiBaseURL + '/problem/detail' + `/${pid}`,
  ACCESS_TOKEN: apiBaseURL + '/OAuth2/accessToken'
}

export const searchProblem = async (pid: string) =>
  axios.get(API.SEARCH_PROBLEM(pid))
    .then(res => res.data || null)

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
