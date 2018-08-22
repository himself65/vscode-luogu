import { EventEmitter } from "events";
import * as vscode from "vscode";
import { UserStatus } from './shared';
import { loginUser, refresh } from "./utils/api";
import { promptForOpenOutputChannel, DialogType } from "./utils/uiUtils";
import { saveUserToLocal, getUserFromLocal } from "./utils/dataUtils";

/**
 * 接口遵循`UserInfo`中的所有属性
 * @interface
 */
export interface UserInfoData {
    username?: string;
    password?: string;
    access_token?: string;
    refresh_token?: string;
    cookie?: string;
    expires_in: number;
}

/**
 * 接口遵循`LuoguUserManager`中的所有属性
 * @interface
 */
export interface LuoguUserData {
    currentUser: string | undefined;
    userStatus: UserStatus;
    userInfo: UserInfo;
    endTime: number | undefined;
}

/**
 * @interface
 */
export interface ILuoguUserManager extends EventEmitter {
    refreshLoginStatus(channel: vscode.OutputChannel): void;
    getStatus(): UserStatus;
    getUser(): string | undefined;
    getUserAccessToken(): string | undefined;
    signIn(channel: vscode.OutputChannel): Promise<void>;
    signOut(channel: vscode.OutputChannel): Promise<void>;
}

/**
 * @interface
 */
export interface IUserInfo { }

/**
 * @class
 */
export class UserInfo implements IUserInfo {
    username?: string;
    password?: string;
    access_token?: string;
    refresh_token?: string;
    cookie?: string;
    expires_in: number;
    constructor(init?: Partial<UserInfo>) {
        Object.assign(this, init);
    }
}

/**
 * @class
 */
export class LuoguUserManager extends EventEmitter implements ILuoguUserManager {
    private currentUser: string | undefined;
    private userStatus: UserStatus;
    private userInfo: UserInfo;
    private endTime: number | undefined;
    constructor(init?: Partial<LuoguUserManager>) {
        console.log('Init LuoguUserManager');
        super();
        if (init) {
            console.log('本地实例化用户');
            Object.assign(this, init);
            if (this.endTime && this.endTime < Date.now()) {
                // 过期
                this.signOut();
            }
        }
        else {
            console.log('新建用户');
            this.userInfo = null;
            this.currentUser = undefined;
            this.userStatus = UserStatus.SignedOut;
        }
        // 令牌过期
        this.on('stateChanged', () => {
            this.saveToLocal();
        });
        this.on('tokenExpired', channel => {
            this.refreshToken(channel);
        });
    }

    /**
     * 将用户信息保存到本地，以便下次使用
     */
    private async saveToLocal(): Promise<void> {
        try {
            await saveUserToLocal({
                currentUser: this.currentUser,
                userStatus: this.userStatus,
                userInfo: this.userInfo,
                endTime: this.endTime
            });
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * 
     * @param channel 用于消息的输出
     */
    public async refreshLoginStatus(channel: vscode.OutputChannel): Promise<void> {
        // TOOD: 刷新用户信息
    }

    /**
     * 刷新令牌
     * @param channel 用于消息的输出
     */
    private async refreshToken(channel: vscode.OutputChannel): Promise<void> {
        try {
            refresh(this.userInfo.refresh_token, async data => {
                this.userInfo = new UserInfo(data);
            }).catch(error => { throw error; });
        } catch (error) {
            console.error(error);
            await promptForOpenOutputChannel("令牌已经失效，请重新登录", DialogType.error, channel);
        }
    }

    /**
     * 
     * @param channel 用于消息的输出
     */
    public async signIn(channel: vscode.OutputChannel): Promise<void> {
        if (this.userStatus === UserStatus.SignedIn) {
            vscode.window.showQuickPick(["是", "否"], { placeHolder: '您已经登录，是否重新登录？' }).then(res => {
                if (res !== "是") {
                    return;
                }
            });
        }
        try {
            let username = await vscode.window.showInputBox({
                placeHolder: '输入您的用户名',
                validateInput: (s: string) => s && s.trim() ? undefined : '输入不能为空'
            });
            let password = await vscode.window.showInputBox({
                placeHolder: '输入账户密码',
                password: true,
                validateInput: (s: string) => s && s.trim() ? undefined : '输入不能为空'
            });
            if (!username && !password) {
                return;
            }
            await loginUser(username, password).then(data => {
                if (!data) { throw TypeError(data); }
                vscode.window.showInformationMessage("成功登录");
                this.userStatus = UserStatus.SignedIn;
                this.userInfo = new UserInfo(data);
                this.endTime = Date.now() + this.userInfo.expires_in * 1000 - 1000 * 60 * 60;
                // 设置结束时间, 提前一小时过期
            }).then(() => {
                this.emit('stateChanged');
            }).catch(error => { throw error; });
        } catch (error) {
            await promptForOpenOutputChannel(error, DialogType.error, channel);
        }
    }

    /**
     * 
     * @param channel 用于消息的输出
     */
    public async signOut(channel?: vscode.OutputChannel): Promise<void> {
        try {
            this.currentUser = null;
            this.userStatus = UserStatus.SignedOut;
            this.userInfo = new UserInfo();
            this.emit('stateChanged');
            vscode.window.showInformationMessage("退出成功");
        } catch (error) {
            await promptForOpenOutputChannel(error, DialogType.error, channel);
        }
    }

    /**
     * @returns 返回用户状态
     */
    public getStatus(): UserStatus {
        return this.userStatus;
    }

    /**
     * @returns 返回当前用户名字
     */
    public getUser(): string | undefined {
        return this.currentUser;
    }

    /**
     * @returns 返回用户Token
     */
    public getUserAccessToken(): string | undefined {
        return this.userInfo.access_token;
    }
}

// 单例模式
export const luoguUserManager: ILuoguUserManager = (() => {
    const obj = getUserFromLocal();
    return new LuoguUserManager(obj);
})();
