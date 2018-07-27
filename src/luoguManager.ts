import { EventEmitter } from "events";
import * as vscode from "vscode";
import { UserStatus } from './shared';

export interface ILuoguManager extends EventEmitter {
    getLoginStatus(channel: vscode.OutputChannel): void;
    getStatus(): UserStatus;
    getUser(): string | undefined;
    signIn(channel: vscode.OutputChannel): void;
    signOut(channel: vscode.OutputChannel): void;
}

class LuoguManager extends EventEmitter implements ILuoguManager {
    private currentUser: string | undefined;
    private userStatus: UserStatus;

    constructor() {
        console.log('Init LuoguManager');
        super();
        this.currentUser = undefined;
        this.userStatus = UserStatus.SignedOut;
    }

    public async getLoginStatus(channel: vscode.OutputChannel): Promise<void> { }
    public async signIn(channel: vscode.OutputChannel): Promise<void> { }
    public async signOut(channel: vscode.OutputChannel): Promise<void> { }
    public getStatus(): UserStatus {
        return this.userStatus;
    }
    public getUser(): string | undefined {
        return this.currentUser;
    }
}

export const luoguManager: ILuoguManager = new LuoguManager();