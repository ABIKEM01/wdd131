(function () {
  const mainNav = document.getElementById("mainNav");
  const menuToggle = document.getElementById("menuToggle");
  const contactForm = document.getElementById("contactForm");
  const contactFeedback = document.getElementById("contactFeedback");
  const featuredList = document.getElementById("featuredList");
  const serviceGrid = document.getElementById("serviceGrid");
  const bookingsList = document.getElementById("bookingsList");
  const applyFilters = document.getElementById("applyFilters");
  const yearSpan = document.getElementById("year");
  const lastModifiedSpan = document.getElementById("lastModified");

  const servicesData = [
    {
      id: 1,
      name: "Plumbing Services",
      category: "plumbing",
      provider: "John Plumbing Co.",
      rating: 4.5,
      price: 15000,
      description: "Professional plumbing and pipe fitting services",
    },
    {
      id: 2,
      name: "Electrical Repairs",
      category: "electrical",
      provider: "Safe Electric Ltd.",
      rating: 4.8,
      price: 12000,
      description: "Certified electrical installation and repairs",
    },
    {
      id: 3,
      name: "Home Cleaning",
      category: "cleaning",
      provider: "Sparkle Clean",
      rating: 4.3,
      price: 8000,
      description: "Thorough home and office cleaning services",
    },
    {
      id: 4,
      name: "Auto Mechanic",
      category: "automotive",
      provider: "AutoFix Garage",
      rating: 4.6,
      price: 20000,
      description: "Professional vehicle repair and maintenance",
    },
  ];

  function toggleMenu() {
    if (!mainNav || !menuToggle) return;

    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    mainNav.classList.toggle("nav-open");

    document.body.classList.toggle("menu-open", !isExpanded);
  }

  function closeMenu() {
    if (!mainNav || !menuToggle) return;

    menuToggle.setAttribute("aria-expanded", "false");
    mainNav.classList.remove("nav-open");
    document.body.classList.remove("menu-open");
  }

  function handleContactSubmit(e) {
    e.preventDefault();
    if (!contactForm) return;

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    if (!nameInput || !emailInput || !messageInput) return;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !message) {
      if (contactFeedback) {
        contactFeedback.textContent = "Please complete all required fields.";
        contactFeedback.style.color = "red";
      }
      return;
    }

    if (contactFeedback) {
      contactFeedback.textContent = `Thanks ${name}, your message has been received.`;
      contactFeedback.style.color = "green";
    }
    contactForm.reset();
  }

  function populateCategories() {
    const categorySelect = document.getElementById("categorySelect");
    if (!categorySelect) return;

    const categories = [
      ...new Set(servicesData.map((service) => service.category)),
    ];

    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
      categorySelect.appendChild(option);
    });
  }

  function renderFeatured() {
    if (!featuredList) return;

    featuredList.innerHTML = "";
    const featuredServices = servicesData.slice(0, 3);

    featuredServices.forEach((service) => {
      const card = createServiceCard(service);
      featuredList.appendChild(card);
    });
  }

  function renderServices() {
    if (!serviceGrid) return;

    serviceGrid.innerHTML = "";

    servicesData.forEach((service) => {
      const card = createServiceCard(service);
      serviceGrid.appendChild(card);
    });
  }

  function createServiceCard(service) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
            <h3>${service.name}</h3>
            <p><strong>Provider:</strong> ${service.provider}</p>
            <p><strong>Rating:</strong> ${service.rating} ⭐</p>
            <p><strong>Price:</strong> ₦${service.price.toLocaleString()}</p>
            <p>${service.description}</p>
            <button class="btn primary" data-service-id="${
              service.id
            }">Book Now</button>
        `;
    return card;
  }

  function applyFilterAndRender() {
    if (!serviceGrid) return;

    const categorySelect = document.getElementById("categorySelect");
    const searchInput = document.getElementById("searchInput");

    const selectedCategory = categorySelect ? categorySelect.value : "all";
    const searchTerm = searchInput
      ? searchInput.value.toLowerCase().trim()
      : "";

    const filteredServices = servicesData.filter((service) => {
      const categoryMatch =
        selectedCategory === "all" || service.category === selectedCategory;
      const searchMatch =
        !searchTerm ||
        service.name.toLowerCase().includes(searchTerm) ||
        service.provider.toLowerCase().includes(searchTerm) ||
        service.description.toLowerCase().includes(searchTerm);

      return categoryMatch && searchMatch;
    });

    serviceGrid.innerHTML = "";
    filteredServices.forEach((service) => {
      const card = createServiceCard(service);
      serviceGrid.appendChild(card);
    });
  }

  function renderBookings() {
    if (!bookingsList) return;

    const bookings = JSON.parse(localStorage.getItem("servverBookings")) || [];

    if (bookings.length === 0) {
      bookingsList.innerHTML = "<p>No saved bookings yet.</p>";
      return;
    }

    bookingsList.innerHTML = "";
    bookings.forEach((booking) => {
      const bookingEl = document.createElement("div");
      bookingEl.className = "booking-item";
      bookingEl.innerHTML = `
                <h4>${booking.serviceName}</h4>
                <p>Provider: ${booking.provider}</p>
                <p>Price: ₦${booking.price.toLocaleString()}</p>
                <button class="btn secondary" data-booking-id="${
                  booking.id
                }">Remove</button>
            `;
      bookingsList.appendChild(bookingEl);
    });
  }

  function onContainerClick(e) {
    if (
      e.target.classList.contains("btn") &&
      e.target.textContent === "Book Now"
    ) {
      const serviceId = e.target.getAttribute("data-service-id");
      const service = servicesData.find((s) => s.id === parseInt(serviceId));

      if (service) {
        const bookings =
          JSON.parse(localStorage.getItem("servverBookings")) || [];
        bookings.push({
          id: Date.now(),
          serviceId: service.id,
          serviceName: service.name,
          provider: service.provider,
          price: service.price,
          bookedAt: new Date().toISOString(),
        });
        localStorage.setItem("servverBookings", JSON.stringify(bookings));

        alert(`Booked: ${service.name} with ${service.provider}`);
        renderBookings();
      }
    }

    if (
      e.target.classList.contains("secondary") &&
      e.target.textContent === "Remove"
    ) {
      const bookingId = e.target.getAttribute("data-booking-id");
      let bookings = JSON.parse(localStorage.getItem("servverBookings")) || [];
      bookings = bookings.filter(
        (booking) => booking.id !== parseInt(bookingId)
      );
      localStorage.setItem("servverBookings", JSON.stringify(bookings));
      renderBookings();
    }
  }

  function setFooterDates() {
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
    if (lastModifiedSpan) {
      const lastModified = document.lastModified;

      if (lastModified && lastModified !== "0") {
        try {
          const date = new Date(lastModified);
          lastModifiedSpan.textContent = date.toLocaleDateString();
        } catch (err) {
          lastModifiedSpan.textContent = lastModified;
        }
      } else {
        lastModifiedSpan.textContent = new Date().toLocaleDateString();
      }
    }
  }

  function setupMenuCloseOnClick() {
    const navLinks = document.querySelectorAll(".nav-list a");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });
  }

  function setupMenuCloseOnOutsideClick() {
    document.addEventListener("click", (e) => {
      if (mainNav && menuToggle && mainNav.classList.contains("nav-open")) {
        const isClickInsideNav = mainNav.contains(e.target);
        const isClickOnToggle = menuToggle.contains(e.target);

        if (!isClickInsideNav && !isClickOnToggle) {
          closeMenu();
        }
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (
      window.location.pathname.includes("services.html") ||
      window.location.pathname.endsWith("/services")
    ) {
      populateCategories();
      renderServices();
      renderBookings();

      if (applyFilters)
        applyFilters.addEventListener("click", applyFilterAndRender);
      if (serviceGrid) serviceGrid.addEventListener("click", onContainerClick);
      if (bookingsList)
        bookingsList.addEventListener("click", onContainerClick);
    }

    if (
      window.location.pathname.includes("index.html") ||
      window.location.pathname.endsWith("/")
    ) {
      renderFeatured();
      if (featuredList)
        featuredList.addEventListener("click", onContainerClick);
    }

    if (
      window.location.pathname.includes("contact.html") ||
      window.location.pathname.endsWith("/contact")
    ) {
      if (contactForm)
        contactForm.addEventListener("submit", handleContactSubmit);
    }

    if (menuToggle) {
      menuToggle.addEventListener("click", toggleMenu);
      setupMenuCloseOnClick();
      setupMenuCloseOnOutsideClick();
    }

    setFooterDates();
  });
})();
