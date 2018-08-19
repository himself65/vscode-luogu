import Axios from 'axios';
import { OAuthInfo, OAuth2ResponseData } from '../shared';
import { luoguUserManager } from '../luoguUserManager';
import { window } from 'vscode';
import { Problem } from '../data/Problem';

Axios.defaults.baseURL = 'https://www.luogu.org/api/';

export async function getProblem(id: string): Promise<any> {
    return await Axios.get(`problem/detail/${id}`).then(res => {
        if (res.status === 200) {
            console.log(`得到题目：${id}`);
            return new Problem(res.data.data);
        } else {
            throw res.data;
        }
    }).catch(error => {
        throw error;
    });
}

export async function loginUser(username: string, password: string): Promise<any> {
    console.log('正在初始化登录');
    return await Axios.post('OAuth2/accessToken', {
        'grant_type': OAuthInfo.grant_type,
        'client_id': OAuthInfo.clientID,
        'client_secret': OAuthInfo.client_secret,
        'username': username,
        'password': password
    }).then(res => {
        if (res.status === 200) {
            console.log('登录成功');
            return res.data;
        } else {
            throw res.status;
        }
    }).catch(error => {
        throw error;
    });
}

export async function refresh(refresh_token: string, callback: (data: OAuth2ResponseData) => Promise<void>): Promise<any> {
    return await Axios.post(OAuthInfo.authorizationUri, {
        'refresh_token': refresh_token
    }).then(res => {
        if (res.status === 200) {
            console.log('刷新Token成功');
            callback(res.data);
        } else {
            throw res.status;
        }
    }).catch(error => {
        throw error;
    });
}

/**
 * @api 提交题解
 * @async
 * @param {string} id 提交id
 * @param {string} text 代码
 * @param {number} language 选择语言
 * @param {boolean} enableO2 是否启用O2优化
 * 
 * @returns {number} 测评id
 */
export async function submitSolution(id: string, text: string, language: number = 0, enableO2: boolean = false): Promise<any> {
    const token = luoguUserManager.getUserAccessToken();
    if (!token) {
        throw Error('您还没有登录账户');
    }
    const Authorization = `Bearer ${token}`;
    const url = `problem/submit/${id}`;
    return await Axios.post(url, {
        'code': text,
        'lang': language,
        'enableO2': enableO2,
        'verify': '',
    }, { 'headers': { 'Authorization': Authorization } }).then(res => {
        if (res.data.status === 200) {
            return res.data.data.rid;
        } else if (res.data.status === 401) {
            window.showErrorMessage('您没有登录');
            throw Error('您没有登录');
        } else {
            throw res.data;
        }
    }, error => { throw error; });
}
