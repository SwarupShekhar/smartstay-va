document.addEventListener('DOMContentLoaded', () => {
  // =======================
  // HERO BACKGROUND SLIDESHOW
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

    // Ensure slideshow element shows background properly
    slideshow.style.transition = 'opacity 1.5s ease-in-out';
    slideshow.style.backgroundSize = 'cover';
    slideshow.style.backgroundPosition = 'center';
    slideshow.style.backgroundRepeat = 'no-repeat';

    // Initial background
    slideshow.style.backgroundImage = `url('${backgrounds[0]}')`;
    slideshow.style.opacity = '1';

    function nextBackground() {
      const next = (current + 1) % backgrounds.length;
      slideshow.style.opacity = '0';
      setTimeout(() => {
        slideshow.style.backgroundImage = `url('${backgrounds[next]}')`;
        slideshow.style.opacity = '1';
        current = next;
      }, 1500); // matches CSS transition time
    }

    // Change every 5 seconds
    setInterval(nextBackground, 5000);
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
