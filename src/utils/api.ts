import * as axois from 'axios';
import { Problem } from '../data/Problem';
import { luoguAuth, OAuthInfo } from '../shared';

export async function getProblem(id: string, callback?: (data: Problem) => void, fail?: (message: string) => void): Promise<void> {
    axois.default.get(`https://www.luogu.org/api/problem/detail/${id}`).then(res => {
        if (res.data.status === 200) {
            console.log(`得到题目：${id}`);
            callback(new Problem(res.data.data));
        } else {
            const err = '找不到题目，请输入合法的编号，例如：P1002、CF101A';
            fail ? fail(err) : console.error(err);
        }
    });
}

export async function loginUser(id: string, password: string, callback?: (cookie: string) => void, fail?: (message: string) => void): Promise<void> {
    console.log('正在登录账户');

    luoguAuth.owner.getToken(id, password, ).then(user => {
        console.log(user);
    }, err => {
        fail ? fail(err) : console.error(err);
    });
}

export async function submitProblem(id: string, text: string, callback?: (uid: number) => void, fail?: (message: string) => void): Promise<void> {

}
