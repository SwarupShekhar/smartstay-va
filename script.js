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

  function nextBackground() {
    const next = (current + 1) % backgrounds.length;

    // Fade out current
    slideshow.style.opacity = 0;

    setTimeout(() => {
      slideshow.style.backgroundImage = `url('${backgrounds[next]}')`;
      slideshow.style.opacity = 1;
      current = next;
    }, 1500); // matches CSS transition time
  }

  // Initial background
  slideshow.style.backgroundImage = `url('${backgrounds[0]}')`;

  // Change every 5 seconds
  setInterval(nextBackground, 5000);
}

// =======================
// PROPERTY FORM SUBMISSION
// =======================
const propertyForm = document.getElementById("propertyForm");
if (propertyForm) {
  propertyForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);

    const scriptURL = "https://script.google.com/macros/s/AKfycbzWT4qtwjVQgW4Q0bfEcZr9vv2pUQy3waB7RPB2W96Bubh0FO7kJ_0rsL1GQxZnHUDj/exec";

    const submitBtn = form.querySelector("button[type='submit']");
    const statusEl = document.getElementById("status");

    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";
    statusEl.textContent = "";

    try {
      const res = await fetch(scriptURL, {
        method: "POST",
        body: data
        // No headers! Let browser set Content-Type for FormData
      });

      if (res.ok) {
        statusEl.textContent = "✅ Submitted successfully!";
        statusEl.classList.add("success");
        statusEl.classList.remove("error");
        form.reset();
      } else {
        statusEl.textContent = "❌ Submission failed.";
        statusEl.classList.add("error");
        statusEl.classList.remove("success");
      }
    } catch (error) {
      statusEl.textContent = "❌ Submission failed.";
      statusEl.classList.add("error");
      statusEl.classList.remove("success");
      console.error("Error:", error);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit";
      setTimeout(() => { statusEl.textContent = ""; }, 5000);
    }
  });
}
      submitBtn.textContent = "Submit";
      setTimeout(() => { statusEl.textContent = ""; }, 5000);
    }
  });
}
