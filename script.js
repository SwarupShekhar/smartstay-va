document.addEventListener('DOMContentLoaded', () => {
  // =======================
  // HERO SLIDESHOW (image elements, more reliable)
  // =======================
  const slideshow = document.querySelector('.hero-slideshow');

  if (slideshow) {
    const backgrounds = [
      'https://raw.githubusercontent.com/SwarupShekhar/smartstay-va/refs/heads/SwarupShekhar-patch-1/Lucid_Origin_a_cinematic_photo_of_ultrarealistic_and_in_high_d_3.jpg',
      'https://raw.githubusercontent.com/SwarupShekhar/smartstay-va/refs/heads/SwarupShekhar-patch-1/Lucid_Origin_a_cinematic_photo_of_ultrarealistic_and_high_defi_3.jpg',
      'https://raw.githubusercontent.com/SwarupShekhar/smartstay-va/refs/heads/SwarupShekhar-patch-1/Lucid_Origin_a_cinematic_photo_of_ultrarealistic_and_high_defi_2.jpg',
      'https://raw.githubusercontent.com/SwarupShekhar/smartstay-va/refs/heads/SwarupShekhar-patch-1/Lucid_Origin_a_cinematic_photo_of_ultrarealistic_and_high_defi_1.jpg',
      'https://raw.githubusercontent.com/SwarupShekhar/smartstay-va/refs/heads/SwarupShekhar-patch-1/Lucid_Origin_a_cinematic_photo_of_ultrarealistic_and_high_defi_0.jpg'
    ];

    let current = 0;

    // create <img> elements and append to slideshow container
    backgrounds.forEach((src, i) => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = `slide-${i}`;
      img.loading = 'lazy';
      if (i === 0) img.classList.add('active');
      slideshow.appendChild(img);
    });

    const slides = slideshow.querySelectorAll('img');

    // ensure CSS transitions are honored
    slideshow.style.backgroundImage = 'none';

    function nextSlide() {
      slides[current].classList.remove('active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('active');
    }

    const intervalId = setInterval(nextSlide, 5000);

    // optional: stop when element removed
    const observer = new MutationObserver(() => {
      if (!document.body.contains(slideshow)) {
        clearInterval(intervalId);
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // PROPERTY / HIRE FORM (works for hire.html and any page with #propertyForm / #hireForm)
  const propertyForm = document.getElementById('propertyForm');
  if (propertyForm) {
    propertyForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const form = e.target;
      const data = new FormData(form);
      const scriptURL = 'https://script.google.com/macros/s/AKfycbzWT4qtwjVQgW4Q0bfEcZr9vv2pUQy3waB7RPB2W96Bubh0FO7kJ_0rsL1GQxZnHUDj/exec';
      const submitBtn = form.querySelector("button[type='submit']");
      const statusEl = document.getElementById('status');
      if (submitBtn) submitBtn.disabled = true;
      if (submitBtn) submitBtn.textContent = 'Submitting...';
      if (statusEl) { statusEl.textContent = ''; statusEl.className = ''; }

      try {
        const res = await fetch(scriptURL, { method: 'POST', body: data });
        if (res.ok) {
          if (statusEl) { statusEl.textContent = '✅ Submitted successfully!'; statusEl.classList.add('success'); }
          form.reset();
        } else {
          if (statusEl) { statusEl.textContent = `❌ Submission failed. Server responded with status: ${res.status}`; statusEl.classList.add('error'); }
        }
      } catch (error) {
        if (statusEl) { statusEl.textContent = '❌ Submission failed. Check your network.'; statusEl.classList.add('error'); }
        console.error('Error:', error);
      } finally {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Submit'; }
        setTimeout(() => { if (statusEl) statusEl.textContent = ''; }, 5000);
      }
    });
  }

  // ===== Reveal on scroll, metrics, marquee pause, smooth scroll, AOS init =====
  // add .reveal to initial elements (if present)
  document.querySelectorAll('#smartstay-promise .smartstay-wrap, #smartstay-promise .metric').forEach(el => el.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        e.target.querySelectorAll('.metric-number').forEach(runCounter);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('#smartstay-promise .reveal').forEach(el => io.observe(el));

  function runCounter(el) {
    const target = Number(el.dataset.target);
    if (!target) return;
    const duration = 1400;
    const startTime = performance.now();
    function tick(now) {
      const p = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(target * eased);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // Pause marquee on focus (accessibility)
  document.querySelectorAll('.marquee').forEach((row) => {
    row.addEventListener('focusin', () => {
      const track = row.querySelector('.marquee__track');
      if (track) track.style.animationPlayState = 'paused';
    });
    row.addEventListener('focusout', () => {
      const track = row.querySelector('.marquee__track');
      if (track) track.style.animationPlayState = 'running';
    });
  });

  // AOS init
  if (window.AOS) AOS.init({ duration: 800, once: true });

  // Smooth anchor scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ===== FAQ Accordion (robust) =====
  document.querySelectorAll('.faq-item').forEach((item) => {
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!btn || !answer) return;

    // set initial accessibility state
    btn.setAttribute('aria-expanded', item.classList.contains('active') ? 'true' : 'false');
    answer.style.maxHeight = item.classList.contains('active') ? `${answer.scrollHeight}px` : '0px';

    btn.addEventListener('click', () => {
      const isActive = item.classList.toggle('active'); // toggles class
      btn.setAttribute('aria-expanded', isActive ? 'true' : 'false');

      if (isActive) {
        // expand: set maxHeight to content height for smooth transition
        answer.style.maxHeight = `${answer.scrollHeight}px`;
        answer.style.paddingTop = '10px';
      } else {
        // collapse
        answer.style.maxHeight = '0px';
        answer.style.paddingTop = '0px';
      }
    });
  });

  // Optional: make Enter/Space activate when focused (accessibility)
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });

  // End DOMContentLoaded
});