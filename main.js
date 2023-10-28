let popoverTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="popover"]')
);
let popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl);
});

// Progress Scrollbar
window.addEventListener("scroll", ScrollProgressBar);
function ScrollProgressBar() {
  const progressBar = document.querySelector("#progressBar");
  const html = document.querySelector("html");
  let scrollDistance = -html.getBoundingClientRect().top;
  let progressPercentage =
    (scrollDistance /
      (html.getBoundingClientRect().height -
        document.documentElement.clientHeight)) *
    100;

  let val = Math.floor(progressPercentage);
  progressBar.style.width = val + "%";

  if (val < 0) {
    progressBar.style.width = "0%";
  }
}
