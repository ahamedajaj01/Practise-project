document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded");

  // Product load
  const URL = "https://fakestoreapi.com/products/";
  const container = document.querySelector(".main-container");

  if (container) {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        data.forEach((item) => {
          const div = document.createElement("div");
          div.classList.add("card");
          div.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="card-img">
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
              <p class="card-price">$${item.price}</p>
              <p class="card-rating">Rating: ${item.rating.rate} (${item.rating.count})</p>
              <button class="btn add-to-cart">Add to cart</button>
            </div>
          `;
          container.appendChild(div);

          // Add to cart functionality
          const addToCartBtn = div.querySelector(".add-to-cart");
          addToCartBtn.addEventListener("click", () => {
            const isLoggedIn = localStorage.getItem("isLoggedIn");
            if (isLoggedIn === "true") {
              addToCart(item);
            } else {
              window.location.href = "login.html";
            }
            // Add to cart function

            function addToCart(item) {
              const userEmail = localStorage.getItem("currentUserEmail");
              if (!userEmail) {
                alert("Please login to add items to cart");
              }
              let cart =
                JSON.parse(localStorage.getItem(`cart_${userEmail}`)) || [];
              cart.push(item);
              localStorage.setItem(`cart_${userEmail}`, JSON.stringify(cart));
              updateCartCount();
              alert(`${item.title} added to cart`);
            }
          });
        });
      });
  }

  // Load cart items in cart.html page
  const cartItemDiv = document.querySelector(".cart-items");
  if (cartItemDiv) {
    // Get cart items from local storage
    const userEmail = localStorage.getItem("currentUserEmail");
    const cart = JSON.parse(localStorage.getItem(`cart_${userEmail}`)) || [];

    if (cart.length === 0) {
      cartItemDiv.innerHTML = `<h2>No items in cart</h2>`;
    } else {
      cart.forEach((item) => {
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
          <img src="${item.image}" alt="${item.title}" class="cart-item-img">
          <div class="cart-item-body">
            <h5 class="cart-item-title">${item.title}</h5>
            <p class="cart-item-price">$${item.price}</p>
            <p class="cart-item-rating">Rating: ${item.rating.rate} (${item.rating.count})</p>
            <button class="btn remove-from-cart">Remove from cart</button>
           
          </div>
          
        `;
        cartItemDiv.appendChild(div);
      });
    }
  }

  //  Remove from cart functionality

  const removeFromCartBtn = document.querySelectorAll(".remove-from-cart");
  if (removeFromCartBtn) {
    removeFromCartBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        const userEmail = localStorage.getItem("currentUserEmail");
        const cart =
          JSON.parse(localStorage.getItem(`cart_${userEmail}`)) || [];
        const itemTitle =
          btn.parentElement.querySelector(".cart-item-title").textContent;
        const newCart = cart.filter((item) => item.title !== itemTitle);
        localStorage.setItem(`cart_${userEmail}`, JSON.stringify(newCart));
        updateCartCount();
        // Optionally, remove the item from the DOM immediately
        btn.closest(".cart-item").remove();
      });
    });
  }

  // Update cart count in navbar

  function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    if (!cartCount) return; // Exit if cart-count element not present

    const userEmail = localStorage.getItem("currentUserEmail");
    if (!userEmail) {
      cartCount.textContent = "0";
      return;
    }

    const cart = JSON.parse(localStorage.getItem(`cart_${userEmail}`)) || [];
    cartCount.textContent = cart.length;
  }

  

  // Load Navbar in every page...
  const navUrl = "navbar.html";
  const navContainer = document.getElementById("navbar_container");

  fetch(navUrl)
    .then((res) => res.text())
    .then((data) => {
      navContainer.innerHTML = data;
      // Call the function to show user name in navbar
      showUserNameInNavbar();
      updateCartCount();

      // Toggle button for mobile navigation
      const toggleButton = document.getElementById("navToggle");
      const mobileNav = document.getElementById("mobileNav");

      if (toggleButton && mobileNav) {
        toggleButton.addEventListener("click", () => {
          mobileNav.classList.toggle("show");

          mobileNav.classList.toggle("nav-hidden");
        });
      }
    });

  // Load Footer
  const footerUrl = "footer.html";
  const footerContainer = document.getElementById("footer-container");
  fetch(footerUrl)
    .then((res) => res.text())
    .then((data) => {
      footerContainer.innerHTML = data;
    });

  // Signup logic and validation for signup page
  const signUpForm = document.querySelector("#signup-form");
  const message = document.querySelector("#message");

  if (signUpForm) {
    signUpForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const fullName = document.querySelector("#fullname").value;
      const email = document.querySelector("#email").value;
      const number = document.querySelector("#number").value;
      const password = document.querySelector("#password").value;
      const confirmPassword = document.querySelector("#confirm-password").value;

      if (!fullName || !email || !number || !password || !confirmPassword) {
        message.innerHTML = `<h3>Please fill all the fields.</h3>`;
        message.style.color = "red";
        return;
      }
      if (password !== confirmPassword) {
        message.innerHTML = `<h3>Passwords do not match.</h3>`;
        message.style.color = "red";
        return;
      }
      if (password.length < 8) {
        message.innerHTML = `<h3>Password must be at least 8 characters long.</h3>`;
        message.style.color = "black";
        return;
      }
      if (number.length < 10) {
        message.innerHTML = `<h3>Phone number must be at least 10 characters long.</h3>`;
        message.style.color = "black";
        return;
      }
      if (fullName.length < 6) {
        message.innerHTML = `<h3>Full name must be at least 6 characters long.</h3>`;
        message.style.color = "black";
        return;
      }
      if (email.length < 6 || !email.includes("@") || !email.includes(".")) {
        message.innerHTML = `<h3>Please enter a valid email address.</h3>`;
        message.style.color = "black";
        return;
      }

      const storedData = JSON.parse(localStorage.getItem("user"));
      if (
        (storedData && storedData.email === email) ||
        (storedData && storedData.number === number) ||
        (storedData && storedData.fullName === fullName)
      ) {
        message.innerHTML = `<h3>User already exists.</h3>`;
        message.style.color = "black";
        return;
      }

      localStorage.setItem(
        "user",
        JSON.stringify({ fullName, password, email }),
      );

      message.innerHTML = `
        <h3>Account created successfully.</h3><br>
        <h3>Welcome ${fullName}</h3><br>
        <h3>Your email is: ${email}</h3>
      `;
      signUpForm.style.display = "none";
    });

    // Toggle eye for signup
    const toggleEyeSignup = document.querySelector(".toggle-eye-for-signup");
    if (toggleEyeSignup) {
      toggleEyeSignup.addEventListener("click", () => {
        const password = document.querySelector("#password");
        if (password.type === "password") {
          password.type = "text";
          toggleEyeSignup.innerHTML = `<i class="fa fa-eye-slash"></i>`;
        } else {
          password.type = "password";
          toggleEyeSignup.innerHTML = `<i class="fa fa-eye"></i>`;
        }
      });
    }
  }

  // Toggle eye for login
  const toggleEyeLogin = document.querySelector(".toggle-eye-for-login");
  const loginPassword = document.querySelector("#login-password");

  if (toggleEyeLogin && loginPassword) {
    toggleEyeLogin.addEventListener("click", (e) => {
      e.preventDefault();
      if (loginPassword.type === "password") {
        loginPassword.type = "text";
        toggleEyeLogin.innerHTML = `<i class="fa fa-eye-slash"></i>`;
      } else {
        loginPassword.type = "password";
        toggleEyeLogin.innerHTML = `<i class="fa fa-eye"></i>`;
      }
    });
  }

  //  function for login when user click on login button

  function loginUser() {
    const loginEmail = document.querySelector("#login-email").value.trim();
    const loginPassword = document
      .querySelector("#login-password")
      .value.trim();

    // Fetch user data from local storage
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) {
      alert(`No user data found. Please sign up first.`);
    }
    const { email, password, fullName } = userData;

    if (loginEmail === email && loginPassword === password) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("fullName", fullName);
      localStorage.setItem("currentUserEmail", email);
      updateCartCount();
      // Show alert
      alert(`Welcome ${fullName}`);
      // Redirect to index.html
      window.location.href = "index.html";
    } else {
      alert(`Invalid email or password. Please try again.`);
    }
  }

  function showUserNameInNavbar() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userName = localStorage.getItem("fullName");
    if (isLoggedIn === "true" && userName) {
      // Update the navbar to show user name
      const navItem = document.getElementById("navbarUserName");
      if (navItem) {
        navItem.innerHTML = `
            <a href="#">👋 ${userName}</a>
            <ul class="dropdown">
              <li><a href="#" onclick="logoutUser()">Logout</a></li>
            </ul>
          `;
      }
    }
  }
  // Add event listener to login button
  const loginBtn = document.querySelector("#login-btn");
  if (loginBtn) {
    loginBtn.addEventListener("click", (e) => {
      e.preventDefault();

      loginUser();
    });
  }
  // Logout function

  window.logoutUser = function () {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("fullName");
    localStorage.removeItem("currentUserEmail");
    updateCartCount();
    window.location.href = "index.html";
  };
});
