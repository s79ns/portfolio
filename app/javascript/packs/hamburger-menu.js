document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("menuButton").addEventListener("click", function () {
    this.classList.toggle("active");
    document.getElementById("hamburger-nav").classList.toggle("active");
  });
});

// DOMContentLoaded ブラウザがHTMLを読み込み、DOMツリーを構築すると発火する
