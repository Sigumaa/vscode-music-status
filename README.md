# music-status

<https://marketplace.visualstudio.com/items?itemName=shiyui.music-status>
![alt text](https://raw.githubusercontent.com/Sigumaa/vscode-music-status/main/image-3.png)

VSCodeのステータスバーに再生中の音楽を表示する拡張機能です。  
再生中の音楽は[Last.fm](https://www.last.fm/)のAPIを使って取得しています。  
[Last.fm](https://www.last.fm/)は、音楽の再生履歴を記録してくれるサービスです。

![np](https://raw.githubusercontent.com/Sigumaa/vscode-music-status/main/image-1.png)

使用するには、[Last.fm](https://www.last.fm/)のAPIキーが必要です。  
また、[Last.fm Terms of Service](https://www.last.fm/api/tos)に従って使用してください。

## Usage

~~今のところマーケットプレイスに公開する予定はないので、リポジトリをクローンして、`vsce package` でパッケージ化してください。~~  

公開しました。  
cloneして自分でpackageする場合はREADMEの下部を参照してください。

APIキーとユーザー名をVSCodeのsettings.jsonに設定してください。  
refreshIntervalのデフォルトは30000msです。

[Last.fm](https://www.last.fm/)のドキュメントにAPIの制限回数が明言されていない(our sole discretionとか書いてある)ので、高頻度にリクエストを送るとAPI制限に引っかかる可能性があります。

```text
{
    // required
    "music-status.apiKey": "Your Last.fm API Key",
    "music-status.user": "Your Last.fm UserName",
    // optional
    "music-status.refreshInterval": 30000,
}
```

再生中の音楽が右下に表示されるはずです。  
![np](https://raw.githubusercontent.com/Sigumaa/vscode-music-status/main/image-1.png)

また、ステータスバーのアイコンをクリックすると、再生中の音楽についての情報がわかるURLに飛ぶことができます。

## vsceを用いる場合

vsceはVSCodeの拡張機能として使えるように、パッケージ化するためのツールです。  

```bash
git clone git@github.com:Sigumaa/vscode-music-status.git
cd vscode-music-status
npm install
vsce package
```

package化に成功するとvsixファイルが生成されます。  
VSCodeの拡張機能のインストール画面から、vsixファイルを選択してインストールしてください。

![alt text](https://raw.githubusercontent.com/Sigumaa/vscode-music-status/main/image-2.png)
