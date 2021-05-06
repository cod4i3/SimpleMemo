# Simple Memo
## 簡単な紹介文
なんとなく役に立ちそうな物を作りたくなったため作ったメモ
特徴としては以下

* 自動的に文章を保存
* 文字数やバイト数を測定できる
* TypeScriptを使い後々の実装や保守の拡張性も保証
* 実装はライブラリ、外部スクリプトに頼らず最小限の構成(執筆時点で約1MB)でオフラインでも動く  

一応SaSSなども考えたが、シンプルなのがウリなので  
多分そこまでガチガチにはしないだろうと考えた  
  
<br>

## 構成  

重要部分だけ簡単に
| ファイル名 | 内容 | 備考 |  
| :----: | :----: | :----: |
| src/popup.js |  jsファイル | 全ての処理が書かれている <br>ほぼtextareaの処理だった為<br>分ける必要を感じずまとめた <br> |
| src/popup.ts | tsファイル | 拡張の余地が沢山あるため<br> 将来の再利用の事を考えてtsに |
| popup.html | html | pタグ部分は汚いので改善の余地あり<br> しかし現状は短いのでこのままで<br> 何より構成がシンプルで分かりやすい|
|popup.css | css | 速度を追求して直接埋め込もうか迷った<br> だがよく考えずともほぼ誤差になりそうで<br> どう考えても別にしたほうがいいため分割  
<br>

## 余談

色々と書いてはいるが、単に使うだけならここまで凝る必要はない  
ただ汎用性は高さを感じたため実装部分だけは少しだけ後に拡張しやすいようにした
拡張機能であるため利便性や軽さを優先してUIには拘らなかったが  
もし改造するなら工夫してもいいかもしれない