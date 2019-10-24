import * as path from 'path';
import * as which from 'which';
import { workspace, ExtensionContext } from 'vscode';

import {
    LanguageClient,
    LanguageClientOptions,
    ServerOptions,
} from 'vscode-languageclient';

let client: LanguageClient;

export function activate(context: ExtensionContext) {
    let serverModule = which.sync('decaf-lsp');
    let serverOptions: ServerOptions = { command: serverModule };

    let clientOptions: LanguageClientOptions = {
        documentSelector: [{ scheme: 'file', language: 'decaf' }],
    };

    client = new LanguageClient(
        'decaf-lsp',
        'Decaf LSP Server',
        serverOptions,
        clientOptions
    );

    client.start();
}

export function deactivate(): Thenable<void> | undefined {
    if (!client) {
        return undefined;
    }
    return client.stop();
}