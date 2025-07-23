
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  burger.classList.toggle('toggle');  
});


document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      navLinks.classList.remove('active'); 
      burger.classList.remove('toggle');   //
    }
  });
});


const scrollElements = document.querySelectorAll('.scroll-reveal');

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.9;

  scrollElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < triggerBottom) {
      el.classList.add('visible');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);


lucide.createIcons();


const form = document.getElementById('kontaktForm');
const modal = document.getElementById('gdprModal');
const gdprCheckbox = document.getElementById('gdprCheckbox');
const confirmBtn = document.getElementById('gdprConfirm');
const cancelBtn = document.getElementById('gdprCancel');

form.addEventListener('submit', e => {
  e.preventDefault(); 
  gdprCheckbox.checked = false; 
  modal.style.display = 'flex'; 
});

confirmBtn.addEventListener('click', () => {
  if (!gdprCheckbox.checked) {
    alert('Musíte souhlasit se zpracováním osobních údajů.');
    return;
  }
  modal.style.display = 'none';
  form.submit(); 
});

cancelBtn.addEventListener('click', () => {
  modal.style.display = 'none'; 
});

document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('#reference .slides blockquote');
  const prevBtn = document.querySelector('#reference .nav.prev');
  const nextBtn = document.querySelector('#reference .nav.next');
  const dotsContainer = document.querySelector('#reference .dots');

  let currentIndex = 0;

  
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    if(i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      goToSlide(i);
    });
    dotsContainer.appendChild(dot);
  });

  function update() {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentIndex);
    });
    dotsContainer.querySelectorAll('button').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    update();
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    update();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    update();
  });

  update();
});


document.addEventListener('DOMContentLoaded', () => {
  const galleryImages = [
    "images/auto.jpeg",
    "images/auto2.jpeg",
    "images/auto3.jpeg",
    "images/auto4.jpeg",
    "images/auto5.jpeg",
    "images/auto6.jpeg",
    "images/auto7.jpeg",
    "images/auto8.jpeg",
    "images/auto9.jpeg",
    "images/auto10.jpeg",
    "images/auto11.jpeg",
    "images/auto12.jpeg"
  ];

  let currentGalleryIndex = 0;
  const galleryFrame = document.querySelector(".gallery-frame img");
  const prevBtn = document.querySelector(".gallery-slider .prev");
  const nextBtn = document.querySelector(".gallery-slider .next");
  const dotsContainer = document.getElementById("galleryDots");
  const fullscreenModal = document.getElementById("fullscreenModal");
  const fullscreenImg = fullscreenModal.querySelector("img");
  const closeFsBtn = fullscreenModal.querySelector(".close-fullscreen");
  const fsPrev = fullscreenModal.querySelector(".prev");
  const fsNext = fullscreenModal.querySelector(".next");

  
  galleryImages.forEach((_, i) => {
    const dot = document.createElement("button");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      currentGalleryIndex = i;
      updateGallery();
    });
    dotsContainer.appendChild(dot);
  });

  
  function updateGallery() {
    galleryFrame.classList.remove("active");
    setTimeout(() => {
      galleryFrame.src = galleryImages[currentGalleryIndex];
      galleryFrame.classList.add("active");
    }, 100);

    dotsContainer.querySelectorAll("button").forEach((dot, i) => {
      dot.classList.toggle("active", i === currentGalleryIndex);
    });
  }

  
  prevBtn.addEventListener("click", () => {
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
    updateGallery();
  });

  nextBtn.addEventListener("click", () => {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
    updateGallery();
  });

  
  let startX = 0;
  galleryFrame.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  galleryFrame.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;
    let diff = endX - startX;

    if (Math.abs(diff) > 50) {
      if (diff < 0) {
        currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
      } else {
        currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
      }
      updateGallery();
    }
  });

  
  galleryFrame.addEventListener("click", () => {
    fullscreenImg.src = galleryImages[currentGalleryIndex];
    fullscreenModal.classList.add("active");
  });

  
  closeFsBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    fullscreenModal.classList.remove("active");
    fullscreenImg.src = "";
  });

  
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && fullscreenModal.classList.contains("active")) {
      fullscreenModal.classList.remove("active");
      fullscreenImg.src = "";
    }
  });

  
  fsPrev.addEventListener("click", (e) => {
    e.stopPropagation();
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
    fullscreenImg.src = galleryImages[currentGalleryIndex];
    updateGallery();
  });

  fsNext.addEventListener("click", (e) => {
    e.stopPropagation();
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
    fullscreenImg.src = galleryImages[currentGalleryIndex];
    updateGallery();
  });

  
  fullscreenModal.addEventListener("click", (e) => {
    if (e.target === fullscreenModal) {
      fullscreenModal.classList.remove("active");
      fullscreenImg.src = "";
    }
  });

  updateGallery();

  
  if (window.lucide) lucide.createIcons();
});

document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', !expanded);
    const answer = button.nextElementSibling;

    if (!expanded) {
      answer.classList.add('open');
    } else {
      answer.classList.remove('open');
    }
  });
});

document.getElementById('toggleGdprDetails').addEventListener('click', function() {
  const details = document.getElementById('gdprDetails');
  const isHidden = details.hasAttribute('hidden');
  if (isHidden) {
    details.removeAttribute('hidden');
    this.setAttribute('aria-expanded', 'true');
  } else {
    details.setAttribute('hidden', '');
    this.setAttribute('aria-expanded', 'false');
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const ctaButton = document.getElementById("ctaButton");

  
  if (window.innerWidth >= 768) {
    ctaButton.setAttribute("href", "#kontakt");

    
    ctaButton.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector("#kontakt").scrollIntoView({ behavior: "smooth" });
    });
  }
});