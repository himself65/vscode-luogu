import * as vscode from 'vscode';

import { Languages } from '../shared';

export const luoguConfig = vscode.workspace.getConfiguration('luogu');

export const selectedLanguage = luoguConfig.get<string>('defaultLanguage');

export function getSelectedLanguage (selected: string = selectedLanguage): number {
  return Languages[selected];
}
