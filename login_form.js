const login_form = document.getElementById('loginForm');

login_form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const login_form_data = new FormData(login_form); 
  const data = Object.fromEntries(login_form_data.entries());

  try {
    const response = await fetch(login_form.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    console.log(response.status, result); // ✅ Debug info

    if (response.ok) {
      // alert("Login successful!");
      window.location.href = "https://bill-project-nidq.onrender.com/Bill-Project/dashboard.html";
    } else {
      alert(result.message || "Invalid credentials");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Something went wrong. Try again.");
  }
});
