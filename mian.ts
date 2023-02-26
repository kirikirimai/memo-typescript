let table: HTMLTableElement | null;
let message: HTMLInputElement | null;

function showTable(html: string) {
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

//メモの型
type Memo = {
  message: string;
  date: Date;
};

//Memo class
class MemoData {
  data: Memo[] = [];

  //追加
  add(mm: Memo): void {
    this.data.unshift(mm);
  }

  //保存
  save(): void {
    localStorage.setItem("memo_data", JSON.stringify(this.data));
  }

  //読み込む
  load(): void {
    const readed = JSON.parse(localStorage.getItem("memo_data"));
    this.data = readed ? readed : [];
  }

  //HTMLを取得
  getHtml(): string {
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
  table = document.querySelector("#table");
  message = document.querySelector("#message");
  document.querySelector("#btn")?.addEventListener("click", doAction);
  document.querySelector("#initial")?.addEventListener("click", doInitial);
});
