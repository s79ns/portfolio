grecaptcha.ready(function () {
  grecaptcha.execute("6LeevgYaAAAAAGRs8Foi5ydEFSd4zmP92XrJOdqh", { action: "contact" }).then(function (token) {
    var recaptchaResponse = document.getElementById("recaptchaResponse");
    recaptchaResponse.value = token;
  });
});
