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
  if (!target.classList.contains("smoothScroll")) return;
  e.preventDefault();
  const targetId = target.hash;
  document.querySelector(targetId).scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});

// コンテンツをスクロールするとふわっと出てくる

const targetElement = document.querySelectorAll(".animationTarget");

document.addEventListener("scroll", function () {
  for (let i = 0; i < targetElement.length; i++) {
    const getElementDistance = targetElement[i].getBoundingClientRect().top + targetElement[i].clientHeight * 0.6;
    if (window.innerHeight > getElementDistance) {
      targetElement[i].classList.add("show");
    }
  }
});
