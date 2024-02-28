import * as vscode from 'vscode';
import axios from 'axios';

interface Track {
    artist: { '#text': string };
    name: string;
    '@attr'?: { nowplaying: boolean };
    url: string;
}

async function getCurrentTrack(apiKey: string, user: string): Promise<{ title: string, url: string }> {
    const url = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${user}&api_key=${apiKey}&format=json&limit=1`;
    try {
        const response = await axios.get<{ recenttracks: { track: Track[] } }>(url);
        const track = response.data.recenttracks.track[0];
        if (track['@attr'] && track['@attr'].nowplaying) {
            return { title: `${track.artist['#text']} - ${track.name}`, url: track.url };
        }
        return { title: 'No track playing', url: '' };
    } catch (error) {
        console.error('Error fetching current track:', error);
        return { title: 'Error fetching current track', url: '' };
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

    vscode.workspace.onDidChangeConfiguration((event) => {
        if (event.affectsConfiguration('music-status')) {
            const { apiKey, user } = loadConfiguration();
            console.log('Configuration changed:', { apiKey, user });
            if (!apiKey || !user) {
                vscode.window.showErrorMessage('Please set your Last.fm API key and user name in the settings');
            } else {
                updateTrack(apiKey, user);
            }
        }
    });
    
    const { apiKey, user } = loadConfiguration();

    if (!apiKey || !user) {
        vscode.window.showErrorMessage('Please set your Last.fm API key and user name in the settings');
    }

    statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBar.command = 'music-status.showCurrentTrack';
    statusBar.name = 'music-status';
    context.subscriptions.push(statusBar);

    async function updateTrack(apiKey: string | undefined, user: string | undefined) {
        console.log('Updating track...');
        if (apiKey && user) {
            const { title: track, url } = await getCurrentTrack(apiKey, user);
            statusBar.text = `$(run) ${track}`;
            statusBar.tooltip = `Click to open track on Last.fm`;
            statusBar.command = url ? { command: 'vscode.open', arguments: [vscode.Uri.parse(url)], title: 'Open track on Last.fm' } : undefined;
            statusBar.show();
        }
    }

    updateTrack(apiKey, user);
    const refreshInterval = vscode.workspace.getConfiguration('music-status').get<number>('refreshInterval');
    console.log('refreshInterval:', refreshInterval);
    setInterval(() => updateTrack(apiKey, user), refreshInterval);

    context.subscriptions.push(vscode.commands.registerCommand('music-status.showCurrentTrack', () => {
        vscode.window.showInformationMessage(statusBar.text.replace('$(run) ', ''));
    }));
}

export function deactivate() {
    statusBar?.dispose();
}
