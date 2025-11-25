document.addEventListener('DOMContentLoaded', () => {
  // =======================
  // HERO SLIDESHOW (image elements, more reliable)
  // =======================
  const slideshow = document.querySelector('.hero-slideshow');
  const customHero = document.getElementById('heroSlideshow'); // page-specific slideshow uses this id

  // Only initialize the global image-element slideshow when a page does NOT provide its own #heroSlideshow
  if (slideshow && !customHero) {
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

  // =======================
  // PROPERTY FORM SUBMISSION
  // =======================
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
      if (statusEl) {
        statusEl.textContent = '';
        statusEl.className = '';
      }

      try {
        const res = await fetch(scriptURL, {
          method: 'POST',
          body: data
        });

        if (res.ok) {
          if (statusEl) {
            statusEl.textContent = '✅ Submitted successfully!';
            statusEl.classList.add('success');
            statusEl.classList.remove('error');
          }
          form.reset();
        } else {
          if (statusEl) {
            statusEl.textContent = `❌ Submission failed. Server responded with status: ${res.status}`;
            statusEl.classList.add('error');
            statusEl.classList.remove('success');
          }
        }
      } catch (error) {
        if (statusEl) {
          statusEl.textContent = '❌ Submission failed. Please check your network connection.';
          statusEl.classList.add('error');
          statusEl.classList.remove('success');
        }
        console.error('Error:', error);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Submit';
        }
        setTimeout(() => { if (statusEl) statusEl.textContent = ''; }, 5000);
      }
    });
  }
});
// Reveal on scroll
document.querySelectorAll('#smartstay-promise .smartstay-wrap, #smartstay-promise .metric')
  .forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      // Count-up for metrics (run once)
      e.target.querySelectorAll('.metric-number').forEach(runCounter);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('#smartstay-promise .reveal').forEach(el => io.observe(el));

function runCounter(el) {
  const target = Number(el.dataset.target);
  if (!target) return;
  let start = 0;
  const duration = 1400;
  const startTime = performance.now();

  function tick(now) {
    const p = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
    el.textContent = Math.floor(start + (target - start) * eased);
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
// Pause marquee on focus (keyboard users)
document.querySelectorAll('.marquee').forEach((row)=>{
  row.addEventListener('focusin', ()=> row.querySelector('.marquee__track').style.animationPlayState = 'paused');
  row.addEventListener('focusout', ()=> row.querySelector('.marquee__track').style.animationPlayState = 'running');
});
// AOS Initialization
AOS.init({
  duration: 800,
  once: true,
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    question.parentElement.classList.toggle('active');
  });
});
// FAQ Accordion Functionality
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const faqItem = question.parentElement;
    faqItem.classList.toggle('active');
  });
});
// FAQ Accordion Functionality
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const faqItem = question.parentElement;
    faqItem.classList.toggle('active');
  });
});
// FAQ Accordion Functionality
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const faqItem = question.parentElement;
    faqItem.classList.toggle('active');
  });
});
// FAQ Accordion Functionality
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const faqItem = question.parentElement;
    faqItem.classList.toggle('active');
  });
});
// FAQ Accordion Functionality
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const faqItem = question.parentElement;
    faqItem.classList.toggle('active');
  });
});
// FAQ Accordion Functionality
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const faqItem = question.parentElement;
    faqItem.classList.toggle('active');
  });
});   
// ========== Floating 3D House (home + pricing) ==========
(function () {
  const container = document.getElementById('floating-house');
  if (!container) return; // only run on pages that have it

  // Make sure THREE + helpers exist
  if (!window.THREE || !THREE.GLTFLoader || !THREE.OrbitControls) {
    console.error('Three.js / GLTFLoader / OrbitControls not available for floating house.');
    return;
  }

  const width = container.clientWidth || 180;
  const height = container.clientHeight || 180;

  // Scene + camera
  const scene = new THREE.Scene();
  scene.background = null;

  const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
  camera.position.set(2.0, 1.8, 3.0);

  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(width, height);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.setClearColor(0x000000, 0);

  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  // Lights
// Lights for a brighter "daytime" look

// Sky and ground light
const hemi = new THREE.HemisphereLight(0xf5f7ff, 0xd0d8e8, 0.9);
scene.add(hemi);

// Soft ambient to fill shadows without washing out
const ambient = new THREE.AmbientLight(0xffffff, 0.35);
scene.add(ambient);

// Main sun light: slightly warm and stronger so the gold roof shines
const dir = new THREE.DirectionalLight(0xfff1c4, 2.0);
dir.position.set(2.5, 5, 3); // from above and in front
scene.add(dir);
  // Controls (small orbit for fun)
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.minDistance = 1.8;
  controls.maxDistance = 3;
  controls.minPolarAngle = 0.7;
  controls.maxPolarAngle = 1.2;

  const loader = new THREE.GLTFLoader();
  let house = null;

  // First try local file; if that fails, use a simple fallback house
  loader.load(
    'house-icon.glb',
    (gltf) => {
      house = gltf.scene || gltf.scenes?.[0];
      if (!house) {
        console.warn('GLB loaded but had no scene, using fallback geometry.');
        house = createFallbackHouse();
      }
      normalizeAndAddHouse(house);
    },
    undefined,
    (error) => {
      console.error('Error loading house-icon.glb, using fallback.', error);
      house = createFallbackHouse();
      normalizeAndAddHouse(house);
    }
  );

  function normalizeAndAddHouse(model) {
    const box = new THREE.Box3().setFromObject(model);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxAxis = Math.max(size.x, size.y, size.z) || 1;

    const scaleFactor = (Math.min(width, height) || 340) / 340;
    model.scale.setScalar((4.2 / maxAxis) * scaleFactor);

    box.setFromObject(model);
    const center = new THREE.Vector3();
    box.getCenter(center);
    model.position.sub(center);

    scene.add(model);
  }

  // Simple fallback "house" made of primitives
  function createFallbackHouse() {
    const g = new THREE.Group();

    const wallMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.05, roughness: 0.8 });
    const wallGeo = new THREE.BoxGeometry(1.2, 0.8, 1.0);
    const walls = new THREE.Mesh(wallGeo, wallMat);
    walls.position.y = 0.4;
    g.add(walls);

    const roofMat = new THREE.MeshStandardMaterial({ color: 0xb9381f, metalness: 0.1, roughness: 0.6 });
    const roofGeo = new THREE.ConeGeometry(0.9, 0.6, 4);
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.rotation.y = Math.PI / 4;
    roof.position.y = 1.05;
    g.add(roof);

    const doorMat = new THREE.MeshStandardMaterial({ color: 0x4b2e83 });
    const doorGeo = new THREE.BoxGeometry(0.28, 0.44, 0.02);
    const door = new THREE.Mesh(doorGeo, doorMat);
    door.position.set(0, 0.2, 0.51);
    g.add(door);

    const chimMat = new THREE.MeshStandardMaterial({ color: 0x333333 });
    const chimGeo = new THREE.BoxGeometry(0.12, 0.24, 0.12);
    const chim = new THREE.Mesh(chimGeo, chimMat);
    chim.position.set(-0.45, 1.15, -0.2);
    g.add(chim);

    return g;
  }

  // Resize
  function onResize() {
    const w = container.clientWidth || 180;
    const h = container.clientHeight || 180;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
  window.addEventListener('resize', onResize);

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    if (house) {
      house.rotation.y += 0.01;
    }
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
})();
<script>
(function() {
  // Selectors — adjust if your hero uses a different class
  const nav = document.querySelector('.nav');
  const hero = document.querySelector('.hero') || document.querySelector('.hero-small');

  if (!nav || !hero) {
    // fallback: no hero found — ensure nav uses default (solid) styling
    nav.classList.add('nav--solid');
    return;
  }

  // Use IntersectionObserver to detect when hero is visible under the navbar
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // hero is visible under the navbar -> use white links
        nav.classList.add('nav--over-hero');
        nav.classList.remove('nav--solid');
      } else {
        // hero out of view -> revert to solid/nav-on-page
        nav.classList.remove('nav--over-hero');
        nav.classList.add('nav--solid');
      }
    });
  }, {
    root: null,
    rootMargin: '-10px 0px 0px 0px', // tweak to trigger slightly earlier/later
    threshold: 0
  });

  // Observe the hero's bottom area — this toggles when hero leaves viewport
  io.observe(hero);

  // Also check on load/resize in case hero height changes
  window.addEventListener('resize', () => io.observe(hero));
})();
</script>
