$(function () {
  $(".mask").click(function () {
    var target = $(this).data("target");
    var modal = document.getElementById(target);
    $(modal).addClass("active");
    $(".modalmask").addClass("active");
  });
  $(".modalmask, .modalClose").click(function () {
    $(".modal, .modalmask").removeClass("active");
  });
});
