const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();


  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = await response.json();

    // Login success
    if (response.ok) {
      alert("Login successful");

      console.log(data);

      // Save token if using JWT
      localStorage.setItem("token", data.token);

      // Redirect user
      window.location.href = "../dashboard/dashboard.html";
    } 
    // Login failed
    else {
      alert(data.error || "Login failed");
    }

  } catch (error) {
    console.error(error);
    alert("Server error");
  }
});