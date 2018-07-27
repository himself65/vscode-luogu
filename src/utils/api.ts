import * as axois from 'axios';
import { Problem } from '../data/Problem';

export async function getProblem(id: string, callback: (data: Problem) => void): Promise<void> {
    axois.default.get(`https://www.luogu.org/api/problem/detail/${id}`).then(res => {
        console.log(`得到题目：${id}`);
        if (res.data.status === 200) {
            callback(new Problem(res.data.data));
        } else {

        }
    });
}

export async function login(id: string, password: string, callback: (data: string) => void): Promise<void> {

}
