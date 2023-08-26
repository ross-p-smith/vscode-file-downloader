// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as vscode from 'vscode';
import FileDownloader, { FileDownloadSettings } from "./FileDownloader";
import HttpRequestHandler from "./networking/HttpRequestHandler";
import IFileDownloader from "./IFileDownloader";
import OutputLogger from "./logging/OutputLogger";
import { File } from 'unzipper';

// Called when the extension is activated
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function activate(context: vscode.ExtensionContext) {
    const logger = new OutputLogger(`File Downloader`, context);
    logger.log(`File Downloader extension now active.`);

    const requestHandler = new HttpRequestHandler(logger);

    // eslint-disable-next-line no-use-before-define
    const settings: FileDownloadSettings = {
        headers: {"Accept": `application/octet-stream`, "Content-Type": `application/octet-stream`}
    };

    const commandHandler = () => {
        const fileDownloader = new FileDownloader(requestHandler, logger);
        const uri: vscode.Uri = vscode.Uri.parse(`https://api.github.com/repos/Azure/apiops/releases/assets/120693194`);
        fileDownloader.downloadFile(uri, `extractor.linux-x64.exe`, context, undefined, undefined, settings);

        vscode.window.showInformationMessage(`Hello!!!`);
    };

    context.subscriptions.push(vscode.commands.registerCommand(`DownloadFile.downloadFile`, commandHandler));
}
