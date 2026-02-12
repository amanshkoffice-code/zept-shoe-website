// Load rating HTML
fetch("rating/rating.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("rating-container").innerHTML = html;
    loadRatingCSS();
    setupRating();
  });

function loadRatingCSS() {
  if (document.getElementById("ratingCSS")) return;
  const link = document.createElement("link");
  link.id = "ratingCSS";
  link.rel = "stylesheet";
  link.href = "rating/rating.css";
  document.head.appendChild(link);
}

// Show popup after 25 sec (only once)
setTimeout(() => {
  if (!localStorage.getItem("zeptRated")) {
    document.getElementById("ratingPopup").classList.add("show");
  }
}, 25000);

function setupRating() {
  const popup = document.getElementById("ratingPopup");
  const stars = popup.querySelectorAll(".stars i");
  const message = popup.querySelector("#ratingMessage");
  const closeBtn = popup.querySelector("#ratingClose");

  // Close button
  closeBtn.onclick = () => closePopup();

  stars.forEach(star => {

    star.addEventListener("mouseover", () => {
      highlightStars(star.dataset.star);
    });

    star.addEventListener("mouseout", () => {
      clearHover();
    });

    star.addEventListener("click", () => {
      const rating = star.dataset.star;
      selectStars(rating);

      localStorage.setItem("zeptRated", rating);

      if (rating == 5) {
        message.innerHTML = "🎉 Awesome! Thank you!";
        launchCelebration();
      } else {
        message.innerHTML = "Thanks for your feedback ❤️";
      }

      // Auto close after 3 sec
      setTimeout(closePopup, 3000);
    });
  });

  function closePopup() {
    popup.classList.remove("show");
  }
}

function highlightStars(count) {
  document.querySelectorAll(".stars i").forEach(star => {
    star.classList.toggle("hovered", star.dataset.star <= count);
  });
}

function clearHover() {
  document.querySelectorAll(".stars i").forEach(star => {
    star.classList.remove("hovered");
  });
}

function selectStars(count) {
  document.querySelectorAll(".stars i").forEach(star => {
    star.classList.toggle("selected", star.dataset.star <= count);
  });
}

// Simple celebration animation
function launchCelebration() {
  const popup = document.getElementById("ratingPopup");

  for (let i = 0; i < 30; i++) {
    const spark = document.createElement("span");
    spark.style.position = "absolute";
    spark.style.width = "6px";
    spark.style.height = "6px";
    spark.style.background = "#7f5cff";
    spark.style.borderRadius = "50%";
    spark.style.left = Math.random() * 100 + "%";
    spark.style.top = Math.random() * 100 + "%";
    spark.style.animation = "spark 1s ease-out forwards";
    popup.appendChild(spark);

    setTimeout(() => spark.remove(), 1000);
  }
}
