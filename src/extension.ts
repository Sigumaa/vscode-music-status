import * as vscode from 'vscode';
import axios from 'axios';

async function getCurrentTrack(apiKey: string, user: string): Promise<string> {
    const url = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${user}&api_key=${apiKey}&format=json&limit=1`;
    try {
        const response = await axios.get(url);
        const track = response.data.recenttracks.track[0];
        if (track['@attr'] && track['@attr'].nowplaying) {
            return `${track.artist['#text']} - ${track.name}`;
        }
    } catch (error) {
        console.error('Error fetching current track:', error);
        return 'Error fetching current track';
    }
    return 'No track playing';
}

let statusBar: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "music-status" is now active!');

	const config = vscode.workspace.getConfiguration('music-status');
	let apiKey = config.get<string>('apiKey');
	let user = config.get<string>('user');

	if (!apiKey || !user) {
		vscode.window.showErrorMessage('Please set your Last.fm API key and user name in the settings');
	}

    statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBar.command = 'music-status.showCurrentTrack';
	statusBar.name = 'music-status';
    context.subscriptions.push(statusBar);


    async function updateTrack() {
		if (apiKey && user) {
			const track = await getCurrentTrack(apiKey, user);
			statusBar.text = `$(run) ${track}`;
			statusBar.tooltip = `Current track: ${track}`;
			statusBar.show();
		}
    }

    setInterval(updateTrack, 30000);
    updateTrack();

    context.subscriptions.push(vscode.commands.registerCommand('music-status.showCurrentTrack', () => {
        vscode.window.showInformationMessage(statusBar.text.replace('$(run) ', ''));
    }));
}

export function deactivate() {
    if (statusBar) {
        statusBar.dispose();
    }
}

