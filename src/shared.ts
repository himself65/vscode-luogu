"use strict";

import * as vscode from 'vscode';
import * as ClientOAuth2 from 'client-oauth2';

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

export const OAuthInfo = {
    clientID: 'luogu-vscode',
    key: 'HasHidden',
    accessTokenUri: 'https://luogu.org/api/OAuth2/accessToken',
    authorizationUri: 'https://luogu.org/api/OAuth2/authorize',
    scopes: []
};

export const luoguAuth = new ClientOAuth2({
    clientId: OAuthInfo.clientID,
    clientSecret: OAuthInfo.key,
    accessTokenUri: OAuthInfo.accessTokenUri,
    authorizationUri: OAuthInfo.authorizationUri,
    scopes: OAuthInfo.scopes
});
