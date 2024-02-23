import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "music-status" is now active!');

	let disposable = vscode.commands.registerCommand('music-status.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from music-status!');
	});

	context.subscriptions.push(disposable);
}


export function deactivate() {}
