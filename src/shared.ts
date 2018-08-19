"use strict";

export enum UserStatus {
    SignedIn = 1,
    SignedOut = 2,
}

export enum Languages {
    "Auto" = 1,
    "Pascal" = 2,
    "C" = 3,
    "C++" = 4,
    "C++11" = 5,
    "C++14" = 11,
    "Python2" = 6,
    "Python3" = 7,
    "Java" = 8,
    "Node.js" = 9,
    // "C++17" = Infinity,
    // "Golang" = Infinity,
    // "Rust" = Infinity,
    // "PHP" = Infinity
}

export enum ProblemState {
    "Waiting" = 0,
    "Judging" = 1,
    "Compile Error" = 2,
    "OLE" = 3,
    "MLE" = 4,
    "TLE" = 5,
    "WA" = 6,
    "RE" = 7,
    "Accepted" = 12,
    "Unaccepted" = 14,
    "Hack Success" = 21,
    "Hack Failure" = 22,
    "Hack Skipped" = 23
}

export interface OAuth2ResponseData {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token?: string;
    scope?: Array<string>;
}

export const OAuthInfo = {
    grant_type: 'password',
    clientID: 'luogu-vscode',
    client_secret: 'HasHidden',
    accessTokenUri: 'https://www.luogu.org/api/OAuth2/accessToken',
    authorizationUri: 'https://www.luogu.org/api/OAuth2/authorize'
};
