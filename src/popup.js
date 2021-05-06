var contents = "";
// 文章のロード
// 開いた時最初のみ呼び出される機能がこれしか無かった
chrome.storage.local.get("hold_content", function(items) {
    // hold_constent（入力値）を読み込んでtextareaのformに入れる
    if (items.hold_content === undefined) {
        document.getElementById("contents").value = "";
    } else {
        document.getElementById("contents").value =
            items.hold_content;
        countSet(contents);
    }
});

// セーブ等の機能
document.getElementById("contents").onkeyup = function() {
    // hold_contentに入力値を保存
    var contents = document.getElementById("contents")
        .value;
    chrome.storage.local.set({ hold_content: contents });
    countSet(contents);
};

function countSet(contents) {
    CharCount(contents);
    ByteCount(contents);
    LineCount(contents);
}
// 文字数カウント
function CharCount(contents) {
    var cnt = contents.length.toString(10);
    document.getElementById("charCounter").textContent = cnt + "文字";
}
// バイト数カウント
function ByteCount(contents) {
    var cnt = 0;
    for (var i = 0; i < contents.length; i++) {
        var chr = contents.charCodeAt(i);
        // 以下はUTF-8でのバイト数
        // ネットで拾ったのを参考にしつつ、念の為文字列の仕組みも調べてから実装
        // なおコメントを変えてはいるが複数のサイトに同じコードがあったから
        // 多分いくつかのサイトは他から ̶パ̶ク̶っ̶て̶  模写して実装している
        // U+0000 - U+007F: 1Byte
        if (chr <= 0x007f) {
            cnt += 1;
        }
        // U+0080 - U+07FF: 2Byte
        else if (chr <= 0x07ff) {
            cnt += 2;
        }
        // U+0800 - U+D7FF: 3Byte
        else if (chr <= 0xd7ff) {
            cnt += 3;
        }
        // U+10000 - U+10FFFF
        //
        // 0xD800 - 0xDBFF (High Surrogates)
        // 0xDC00 - 0xDFFF (Low Surrogates)
        // サロゲートペアで表現される範囲、4Byteを 4/2で計算している
        else if (chr <= 0xdfff) {
            cnt += 2;
            // U+E000 - U+FFFF: 3バイト
        } else if (chr <= 0xffff) {
            cnt += 3;
        }
        // undefined code point in UTF-16
        // do nothing
        else {}
    }
    document.getElementById("byteCounterUTF8").textContent =
        cnt + "バイト(UTF-8)" + "\r\n";
    // ここからはShift-JIS（全角1Byte 半角2Byte)
    cnt = 0;
    for (var i = 0; i < contents.length; i++) {
        var chr = contents.charCodeAt(i);
        if ((chr >= 0x00 && chr < 0x81) ||
            chr === 0xf8f0 ||
            (chr >= 0xff61 && chr < 0xffa0) ||
            (chr >= 0xf8f1 && chr < 0xf8f4)) {
            //半角文字の場合は1を加算
            cnt += 1;
        } else {
            //それ以外の文字の場合は2を加算
            cnt += 2;
        }
    }
    document.getElementById("byteCounterShiftJIS").textContent =
        cnt + "バイト(Shift-JIS)\n";
}
// 行数カウント
function LineCount(contents) {
    var cnt = contents.split(/\r|\r\n|\n/g).length.toString(10);
    document.getElementById("lineCounter").textContent = cnt + "行";
}