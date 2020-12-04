window.addEventListener("scroll", function () {
  // イベントターゲットをwindow、発火条件はスクロールという関数を作る
  const scroll = document.documentElement.scrollTop; // documentのルート要素で一番上からのスクロール値を取得する処理を変数で定義
  const PageTopBtn = document.getElementById("scrollValue");

  if (scroll > 300) {
    document.querySelector(".scroll").classList.add("top"); // スクロール値が一定以下であればクラスを付与
  } else {
    document.querySelector(".scroll").classList.remove("top"); // スクロール値が一定以上であればクラスを削除
  }

  PageTopBtn.addEventListener("click", () => {
    window.scrollTo({
      // 文書内の特定の組み合わせまでスクロールする
      top: 0,
      behavior: "smooth", // スムーススクロール
    });
  });
});
