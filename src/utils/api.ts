import * as axois from 'axios';
import { Problem } from '../data/Problem';

export async function getProblem(id: string, callback: (data: Problem) => void, fail?: (message: string) => void): Promise<void> {
    axois.default.get(`https://www.luogu.org/api/problem/detail/${id}`).then(res => {
        if (res.data.status === 200) {
            console.log(`得到题目：${id}`);
            callback(new Problem(res.data.data));
        } else {
            const err = '找不到题目';
            fail ? fail(err) : console.error(err);
        }
    });
}

export async function login(id: string, password: string, callback: (cookie: string) => void, fail?: (message: string) => void): Promise<void> {
    axois.default.post('https://www.luogu.org/login/loginpage', { data: { 'username': `${id}`, 'password': `${password}` } }).then(res => {
        if (res.status === 200) {
            callback(res.headers.cookies);
        } else {
            const err = '错误';
            fail ? fail(err) : console.error(err);
        }
    });
}

export async function submit(id: string, text: string, callback: (uid: number) => void, fail?: (message: string) => void): Promise<void> {

}