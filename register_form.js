  const register_form = document.getElementById('registerForm');
  register_form.addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent default register_form submission

    const register_form_data = new FormData(register_form);
    const data = Object.fromEntries(register_form_data.entries());

    try {
      const response = await fetch(register_form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        // Redirect to login.html after success
window.location.href = "https://bill-project-nidq.onrender.com/Bill-Project/login.html";
      } else {
        const result = await response.json();
        alert(result.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("User with same email or username already exists");
    }
  });

