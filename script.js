const form = document.querySelector(".contact-form");
const formInputs = document.querySelectorAll(
  ".form-group input, .form-group textarea"
);
const submitBtn = form.querySelector('button[type="submit"]');
const modal = document.getElementById("alert-modal");
const alertBtn = document.getElementById("alert-btn");

const toggleMenu = () => {
  document.querySelector(".nav ul").classList.toggle("active");
  document.querySelector(".hamburger").classList.toggle("active");
};

const validateEmail = (value) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(value);
};

const validatePhone = (value) => {
  const regex = /^\d+$/;
  return regex.test(value);
};

const formValidation = () => {
  let formCompleted = true;
  let validEmail = true;
  let validPhone = true;

  formInputs.forEach((input) => {
    if (!input.value) {
      formCompleted = false;
    }

    if (input.id === "email") {
      validEmail = validateEmail(input.value);
    }

    if (input.id === "phone") {
      validPhone = validatePhone(input.value);
    }
  });
  submitBtn.disabled = !(formCompleted && validEmail && validPhone);
};

const showModal = () => {
  modal.style.display = "block";
};

const hideModal = () => {
  modal.style.display = "none";
  clearAll();
};

const renderSection = (sectionId, sectionData) => {
  const sectionContainer = document.getElementById(sectionId);

  sectionData.forEach((item) => {
    const sectionItem = document.createElement("div");
    sectionItem.classList.add("section-item");

    const imgWrapper = document.createElement("div");
    imgWrapper.classList.add("img-wrapper");

    const img = document.createElement("img");
    img.src = item.imageUrl;
    img.alt = item.imageDesc;

    const category = document.createElement("p");
    category.textContent = item.imageDesc;

    imgWrapper.appendChild(img);
    imgWrapper.appendChild(category);

    const title = document.createElement("h3");
    title.textContent = item.title;

    const description = document.createElement("p");
    description.textContent = item.description;

    sectionItem.appendChild(imgWrapper);
    sectionItem.appendChild(title);
    sectionItem.appendChild(description);

    sectionContainer.appendChild(sectionItem);
  });
};

const fetchData = async () => {
  try {
    const response = await fetch("/assets/data.json");
    const data = await response.json();

    if (data.section1Data && data.section2Data) {
      renderSection("section1-content", data.section1Data);
      renderSection("section2-content", data.section2Data);
    }
  } catch (error) {
    console.error("Error loading JSON data:", error);
  }
};

const clearAll = () => {
  formInputs.forEach((input) => {
    input.value = "";
  });
  submitBtn.disabled = true;
};

const formGroupListener = () => {
  formInputs.forEach((input) => {
    input.addEventListener("blur", () => formValidation());
  });
};

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
  formGroupListener();
  formValidation();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  showModal();
});

alertBtn.addEventListener("click", hideModal);
