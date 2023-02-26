"use strict";
let table;
let message;
function showTable(html) {
    table.innerHTML = html;
}
function doAction() {
    const msg = message.value;
    memo.add({ message: msg, date: new Date() });
    memo.save();
    memo.load();
    showTable(memo.getHtml());
}
function doInitial() {
    memo.data = [];
    memo.save();
    memo.load();
    message.value = "";
    showTable(memo.getHtml());
}
//Memo class
class MemoData {
    constructor() {
        this.data = [];
    }
    //追加
    add(mm) {
        this.data.unshift(mm);
    }
    //保存
    save() {
        localStorage.setItem("memo_data", JSON.stringify(this.data));
    }
    //読み込む
    load() {
        const readed = JSON.parse(localStorage.getItem("memo_data") || '{}');
        this.data = readed ? readed : [];
    }
    //HTMLを取得
    getHtml() {
        let html = "<thead><th>memo</th><th>date</th></thead><tbody>";
        for (let item of this.data) {
            html +=
                "<tr><td>" +
                    item.message +
                    "</td><td>" +
                    item.date.toLocaleString() +
                    "</td></tr>";
        }
        return html + "</tbody>";
    }
}
const memo = new MemoData();
window.addEventListener("load", () => {
    var _a, _b;
    table = document.querySelector("#table");
    message = document.querySelector("#message");
    (_a = document.querySelector("#btn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", doAction);
    (_b = document.querySelector("#initial")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", doInitial);
});
