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

// スタイルギャラリーのライトボックス
const lightboxImages = document.querySelectorAll(".js-lightbox");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

let currentIndex = 0;

const imageList = Array.from(lightboxImages).map((img) => img.src);

function openLightbox(index) {
  currentIndex = index;
  lightboxImg.src = imageList[currentIndex];
  lightbox.classList.add("is-open");
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
}

function showPrev() {
  currentIndex = (currentIndex - 1 + imageList.length) % imageList.length;
  lightboxImg.src = imageList[currentIndex];
}

function showNext() {
  currentIndex = (currentIndex + 1) % imageList.length;
  lightboxImg.src = imageList[currentIndex];
}

lightboxImages.forEach((img, index) => {
  img.addEventListener("click", () => openLightbox(index));
});

lightboxClose.addEventListener("click", closeLightbox);
lightboxPrev.addEventListener("click", showPrev);
lightboxNext.addEventListener("click", showNext);

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

//Voice Slider
const voiceTrack = document.querySelector(".voice-slider__track");
const voiceCards = document.querySelectorAll(".voice-card");
const voiceDots = document.querySelectorAll(".voice-slider__dot");

if (voiceTrack && voiceCards.length && voiceDots.length) {
  let currentIndex = 0;

  const updateVoiceSlider = () => {
    const activeCard = voiceCards[currentIndex];
    const viewport = voiceTrack.parentElement;

    if (!activeCard || !viewport) {
      return;
    }

    const viewportCenter = viewport.clientWidth / 2;
    const cardCenter =
      activeCard.offsetLeft + activeCard.offsetWidth / 2;

    const translateX = viewportCenter - cardCenter;

    voiceTrack.style.transform = `translateX(${translateX}px)`;

    voiceCards.forEach((card, index) => {
      card.classList.toggle("is-active", index === currentIndex);
    });

    voiceDots.forEach((dot, index) => {
      const isActive = index === currentIndex;

      dot.classList.toggle("is-active", isActive);

      if (isActive) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });
  };

  voiceDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentIndex = index;
      updateVoiceSlider();
    });
  });

  window.addEventListener("resize", updateVoiceSlider);

  updateVoiceSlider();
}