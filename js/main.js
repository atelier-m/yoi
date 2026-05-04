// ハンバーガーメニュー
const toggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

toggle.addEventListener("click", () => {
  toggle.classList.toggle("active");
  menu.classList.toggle("is-open");
});

menu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    toggle.classList.remove("active");
    menu.classList.remove("is-open");
  });
});

//Strengthホバー
const strengthItems = document.querySelectorAll('.strength__item');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-show');
    }
  });
}, {
  threshold: 0.2
});

strengthItems.forEach(item => observer.observe(item));