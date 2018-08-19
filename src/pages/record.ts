import * as WebSocket from 'ws';
import { promptForOpenOutputChannel, DialogType } from '../utils/uiUtils';
import * as vscode from 'vscode';

// 处理数据
function renderData(detail, status, score, time, memory) {

}

//
function showLoading() {

}

async function connectWs(rid: string, channel: vscode.OutputChannel) {
    let ws = null;
    try {
        ws = new WebSocket('wss://ws.luogu.org/ws');
    } catch (e) {
        promptForOpenOutputChannel("无法连接追踪服务器，请定期手动刷新页面查看结果。", DialogType.error, channel);
        return;
    }

    ws.onopen = function () {
        showLoading();
        let message = {
            "type": "join_channel",
            "channel": "record.track",
            "channel_param": rid
        };
        ws.send(JSON.stringify(message));
    };

    ws.onmessage = function (event) {
        let data = JSON.parse(event.data);
        if (data.type === "status_push") {
            renderData(data.detail, data.status, data.score, data.time, data.memory);
        } else if (data.type === "result") {
            data = data.welcome_message;
            renderData(data.detail, data.status, data.score, data.time, data.memory);
        }
    };
}