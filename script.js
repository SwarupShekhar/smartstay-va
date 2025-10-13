// =======================
// HERO BACKGROUND SLIDESHOW
// =======================
const hero = document.querySelector('.hero');

const backgrounds = [
  'https://raw.githubusercontent.com/SwarupShekhar/smartstay-va/refs/heads/SwarupShekhar-patch-1/Lucid_Origin_a_cinematic_photo_of_ultrarealistic_and_high_defi_3.jpg',
  'https://raw.githubusercontent.com/SwarupShekhar/smartstay-va/refs/heads/SwarupShekhar-patch-1/Lucid_Origin_a_cinematic_photo_of_ultrarealistic_and_high_defi_2.jpg',
  'https://raw.githubusercontent.com/SwarupShekhar/smartstay-va/refs/heads/SwarupShekhar-patch-1/Lucid_Origin_a_cinematic_photo_of_ultrarealistic_and_high_defi_1.jpg',
  'https://raw.githubusercontent.com/SwarupShekhar/smartstay-va/refs/heads/SwarupShekhar-patch-1/Lucid_Origin_a_cinematic_photo_of_ultrarealistic_and_high_defi_0.jpg'
];

let current = 0;

function changeBackground() {
  hero.style.backgroundImage = `url('${backgrounds[current]}')`;
  current = (current + 1) % backgrounds.length;
}

// Initial background
changeBackground();

// Change every 5 seconds
setInterval(changeBackground, 5000);


// =======================
// PROPERTY FORM SUBMISSION
// =======================
document.getElementById("propertyForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const data = {
    name: form.name.value,
    email: form.email.value,
    property: form.property.value,
    location: form.location.value,
    services: form.services.value
  };

  const scriptURL = "https://script.google.com/macros/s/AKfycbzWT4qtwjVQgW4Q0bfEcZr9vv2pUQy3waB7RPB2W96Bubh0FO7kJ_0rsL1GQxZnHUDj/exec";

  const submitBtn = form.querySelector("button[type='submit']");
  const statusEl = document.getElementById("status");

  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";
  statusEl.textContent = "";

  try {
    const res = await fetch(scriptURL, {
      method: "POST",
      body: JSON.stringify(data)
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
