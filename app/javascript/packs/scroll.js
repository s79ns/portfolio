// トップに戻るボタン

window.addEventListener("scroll", function () {
  const scroll = document.documentElement.scrollTop;
  const PageTopBtn = document.getElementById("scrollValue");

  if (scroll > 300) {
    document.querySelector(".scroll").classList.add("top");
  } else {
    document.querySelector(".scroll").classList.remove("top");
  }

  PageTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

// コンテンツのスムーズスクロール

document.addEventListener("click", (e) => {
  const target = e.target;
  if (!target.classList.contains("smooth")) return;
  e.preventDefault();
  const targetId = target.hash;
  document.querySelector(targetId).scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});
