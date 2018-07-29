"use strict";

import * as vscode from 'vscode';

export enum UserStatus {
    SignedIn = 1,
    SignedOut = 2,
}

export const Languages = [
    "Auto",
    "C++11",
    "C++",
    "C",
    "Pascal",
    "Node.js",
    "Java",
    "Python2",
    "Python3",
];

export enum ProblemState {
    AC = 1,
    UAC = 2,
    Unknow = 3,
}

export function showError(message?: string): void {
    vscode.window.showErrorMessage(message);
}

export const Oauth = {
    clientID: 'luogu-dev',
    key: 'HasHidden'
};
