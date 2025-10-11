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
  
    const scriptURL = "https://script.google.com/macros/s/AKfycbzWT4qtwjVQgW4Q0bfEcZr9vv2pUQy3waB7RPB2W96Bubh0FO7kJ_0rsL1GQxZnHUDj/exec"; // Replace with your Apps Script URL
  
    try {
      const res = await fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify(data)
      });
  
      document.getElementById("status").textContent =
        res.ok ? "✅ Submitted successfully!" : "❌ Submission failed.";
  
      form.reset();
    } catch (error) {
      document.getElementById("status").textContent = "❌ Submission failed.";
      console.error("Error:", error);
    }
  });
  