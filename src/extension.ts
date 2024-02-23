import * as vscode from 'vscode';
import axios from 'axios';

interface Track {
    artist: { '#text': string };
    name: string;
    '@attr'?: { nowplaying: boolean };
}

async function getCurrentTrack(apiKey: string, user: string): Promise<string> {
    const url = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${user}&api_key=${apiKey}&format=json&limit=1`;
    try {
        const response = await axios.get<{ recenttracks: { track: Track[] } }>(url);
        const track = response.data.recenttracks.track[0];
        if (track['@attr'] && track['@attr'].nowplaying) {
            return `${track.artist['#text']} - ${track.name}`;
        }
        return 'No track playing';
    } catch (error) {
        console.error('Error fetching current track:', error);
        return 'Error fetching current track';
    }
}

function loadConfiguration(): { apiKey: string | undefined, user: string | undefined } {
    const config = vscode.workspace.getConfiguration('music-status');
    const apiKey = config.get<string>('apiKey');
    const user = config.get<string>('user');
    return { apiKey, user };
}

let statusBar: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, "music-status" is now active!');

    const { apiKey, user } = loadConfiguration();

    if (!apiKey || !user) {
        vscode.window.showErrorMessage('Please set your Last.fm API key and user name in the settings');
    }
    console.log('apiKey:', apiKey);
    console.log('user:', user);

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

    updateTrack();
    const refreshInterval = vscode.workspace.getConfiguration('music-status').get<number>('refreshInterval');
    console.log('refreshInterval:', refreshInterval);
    setInterval(updateTrack, refreshInterval);

    context.subscriptions.push(vscode.commands.registerCommand('music-status.showCurrentTrack', () => {
        vscode.window.showInformationMessage(statusBar.text.replace('$(run) ', ''));
    }));
}

export function deactivate() {
    statusBar?.dispose();
}
