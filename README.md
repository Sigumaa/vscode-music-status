# music-status README

Display the currently playing song from [Last.fm](https://www.last.fm/) in the status bar.

## Extension Setting

Set Your [Last.fm](https://www.last.fm/) API Key and UserName in settings.json.

## Usage

今のところマーケットプレイスに公開する予定はないので、リポジトリをクローンして、`vsce package` でパッケージ化してください。vsceはVSCodeの拡張機能をパッケージ化するためのツールです。各自の環境に合わせてインストールしてください。`npm install -g vsce` 等でインストールできます。

APIキーとユーザー名をsettings.jsonに設定してください。  
refreshIntervalのデフォルトは30000msです。

```text
{
    // required
    "music-status.apiKey": "Your Last.fm API Key",
    "music-status.user": "Your Last.fm UserName",
    // optional
    "music-status.refreshInterval": 30000,
}
```

Ctrl + Shift + P でコマンドパレットを開き、`show current track` を選択してください。  
![csp](https://raw.githubusercontent.com/Sigumaa/vscode-music-status/main/image.png)

再生中の音楽が右下に表示されるはずです。  
![np](https://raw.githubusercontent.com/Sigumaa/vscode-music-status/main/image-1.png)
