# music-status README

Display the currently playing song from Last.fm in your VSCode status bar.

## Extension Setting

Set Your Last.fm API Key and UserName

## Usage

今のところマーケットプレイスに公開する予定はないので、リポジトリをクローンして、`vsce package` でパッケージ化してください。

APIキーとユーザー名をsettings.jsonに設定してください。  
refreshIntervalのデフォルトは30000msです。

```json
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
