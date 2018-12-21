import * as os from 'os'
import * as path from 'path'
import * as fse from 'fs-extra'
import { LuoguUserData } from '../luoguUserManager'
import { error } from 'util'

const luoguJSONName = 'luogu.json'

export const luoguPath = path.join(os.homedir(), '.luogu')

export const problemPath = path.join(luoguPath, 'problems')

export const luoguJSONPath = path.join(luoguPath, luoguJSONName)

export async function save (): Promise<void> {
  throw Error('还没做')
}

// 创建文件夹
export async function createFolder (path: string): Promise<void> {
  return fse.ensureDir(path)
}

export async function saveJsonToFile (path: string, obj: object): Promise<void> {
  if (!path || !obj) { throw error }
  try {
    return await fse.writeJson(path, obj)
  } catch (err) {
    throw err
  }
}

/**
 * 从文件中加载数据，格式JSON
 * @param {string} path 路径地址
 */
export async function loadJsonFromFile (path: string): Promise<any> {
  try {
    const exist: boolean = fse.pathExistsSync(path)
    if (!exist) {
      return null
    } else {
      return await fse.readJson(path)
    }
  } catch (err) {
    throw err
  }
}

export function getUserFromLocal () {
  try {
    const exist: boolean = fse.pathExistsSync(luoguJSONPath)
    if (!exist) {
      return null
    } else {
      return fse.readJsonSync(luoguJSONPath)
    }
  } catch (err) {
    throw err
  }
}

export async function saveUserToLocal (data: LuoguUserData): Promise<void> {
  try {
    const exist: boolean = await fse.pathExists(luoguJSONPath)
    if (!exist) {
      console.log('文件不存在，创建文件')
      await fse.ensureFile(luoguJSONPath)
    }
    await fse.writeJSON(luoguJSONPath, data).then(() => {
      console.log('成功保存到本地')
    }).catch(error => {
      throw error
    })
  } catch (error) {
    throw error
  }
}
