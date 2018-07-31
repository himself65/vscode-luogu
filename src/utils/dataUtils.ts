import * as os from "os";
import * as path from "path";
import * as fse from 'fs-extra';
import { LuoguUserManager } from "../luoguUserManager";

const luoguJSONName = 'luogu.json';

export const luoguPath = path.join(os.homedir(), '.luogu');

export const luoguJSONPath = path.join(luoguPath, luoguJSONName);

export async function save(): Promise<void> {
    throw Error('还没做');
}

export function getUserFromLocal() {
    const exist: boolean = fse.pathExistsSync(luoguJSONPath);
    if (!exist) {
        return null;
    } else {
        return fse.readJsonSync(luoguJSONPath);
    }
}

export async function saveUserToLocal(data: LuoguUserManager): Promise<void> {
    try {
        const exist: boolean = await fse.pathExists(luoguJSONPath);
        if (!exist) {
            console.log('文件不存在，创建文件');
            await fse.ensureFile(luoguJSONPath);
        }
        await fse.writeJSON(luoguJSONPath, data).then(() => {
            console.log('成功保存到本地');
        }).catch(error => {
            throw error;
        });
    } catch (error) {
        throw error;
    }
}
