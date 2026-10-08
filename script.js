document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Hamburger Menu Toggle
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // 2. Active Link Highlighting on Scroll
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 150) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // 3. Terminal Typewriter Effect
  const phrases = [
    "Initializing Database Management Protocols...",
    "Executing B.Tech CSE Systems Query...",
    "Strategic Planning & Execution Enabled.",
    "System Status: OPTIMAL."
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typedTextElement = document.getElementById('typed-text');

  function typeEffect() {
    if (!typedTextElement) return;
    
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
      typedTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 30 : 60;

    if (!isDeleting && charIndex === currentPhrase.length) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
  }

  typeEffect();

  // 4. Testimonial Carousel Functionality
  const track = document.getElementById('carouselTrack');
  const slides = Array.from(track ? track.children : []);
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');
  const nav = document.getElementById('carouselNav');
  const indicators = nav ? Array.from(nav.children) : [];

  if (track && slides.length > 0) {
    let currentIndex = 0;

    const moveToSlide = (index) => {
      track.style.transform = `translateX(-${index * 100}%)`;
      indicators.forEach(ind => ind.classList.remove('active'));
      if (indicators[index]) indicators[index].classList.add('active');
      currentIndex = index;
    };

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const nextIndex = (currentIndex + 1) % slides.length;
        moveToSlide(nextIndex);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        moveToSlide(prevIndex);
      });
    }

    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => moveToSlide(index));
    });

    // Auto-advance Carousel every 6 seconds
    setInterval(() => {
      const nextIndex = (currentIndex + 1) % slides.length;
      moveToSlide(nextIndex);
    }, 6000);
  }

  // 5. Contact Form Handler Simulation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Packet transmitted successfully! Aswini will get back to you shortly.');
      contactForm.reset();
    });
  }
});