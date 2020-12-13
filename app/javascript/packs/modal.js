$(function () {
  $(".mask").click(function () {
    let target = $(this).data("target");
    let modal = document.getElementById(target);
    $(modal).addClass("active");
    $(".modalmask").addClass("active");
  });
  $(".modalmask, .modalClose").click(function () {
    $(".modal, .modalmask").removeClass("active");
  });
});

// 発火地点に(data-target="a")、表示させたいモーダルに#(data-targetで定義した値)をそれぞれ記述して使って下さい
// Gemfile → gem 'jquery-rails'、application.html.haml → %script{src:"https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"}
