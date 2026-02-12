// ================= AUTH LOGIC =================

// Save user (localStorage demo)
document.addEventListener("DOMContentLoaded", () => {

  const signupForm = document.getElementById("signupForm");

  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const inputs = signupForm.querySelectorAll("input");
      const user = {
        name: inputs[0].value,
        email: inputs[1].value,
        password: inputs[2].value
      };

      localStorage.setItem("zeptUser", JSON.stringify(user));

      alert("Account Created Successfully 🚀");

      // Close modal
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("signupModal")
      );
      modal.hide();
    });
  }

});
