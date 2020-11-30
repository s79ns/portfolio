// チェックボックスの取得
const btn = document.querySelector("#toggle");
// チェックした時の挙動
btn.addEventListener("change", () => {
  if (btn.checked == true) {
    // ダークモード
    document.body.classList.remove("light-theme");
    document.body.classList.add("dark-theme");
  } else {
    // ライトモード
    document.body.classList.remove("dark-theme");
    document.body.classList.add("light-theme");
  }
});
