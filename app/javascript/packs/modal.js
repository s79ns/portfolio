(function () {
  const modal = document.getElementById("modal");
  const modalOpen = document.getElementById("modalOpen");
  const modalClose = document.getElementById("modalClose");
  const modalmask = document.getElementById("modalmask");
  const toggle = [modalOpen, modalClose, modalmask];

  for (let i = 0, len = toggle.length; i < len; i++) {
    toggle[i].addEventListener(
      "click",
      function () {
        modal.classList.toggle("active");
        modalmask.classList.toggle("active");
      },
      false
    );
  }
})();
