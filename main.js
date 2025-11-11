//search bar 
const input = document.getElementById("searchInput");
const placeholders = [
  'Search for " Banana "',
  'Search for " Kurkure "',
  'Search for " Chocolate box "',
  'Search for " Cheese slices "',
];
let index = 0;
setInterval(() => {
  input.placeholder = placeholders[index];
  index = index + 1;
  if (index === placeholders.length) {
    index = 0;
  }
}, 2000);

// Navbar scroll 
const navMenu = document.getElementById("categoryMenu");
const navLeft = document.getElementById("scrollLeft");
const navRight = document.getElementById("scrollRight");

navLeft.addEventListener("click", () => {
  navMenu.scrollBy({ left: -250, behavior: "smooth" });
});
navRight.addEventListener("click", () => {
  navMenu.scrollBy({ left: 250, behavior: "smooth" });
});

function updateNavbarArrows() {
  const canScroll = navMenu.scrollWidth > navMenu.clientWidth;
  if (!canScroll) {
    navLeft.style.display = "none";
    navRight.style.display = "none";
    return;
  }
  navLeft.style.display = navMenu.scrollLeft > 10 ? "flex" : "none";
  navRight.style.display = navMenu.scrollLeft + navMenu.clientWidth < navMenu.scrollWidth - 10 ? "flex" : "none";
}

navMenu.addEventListener("scroll", updateNavbarArrows);
window.addEventListener("resize", updateNavbarArrows);
updateNavbarArrows();

// Category scroll section
const catMenu = document.getElementById("category-container");
const catLeft = document.getElementById("catScrollLeft");
const catRight = document.getElementById("catScrollRight");

catLeft.addEventListener("click", () => {
  catMenu.scrollBy({ left: -250, behavior: "smooth" });
});
catRight.addEventListener("click", () => {
  catMenu.scrollBy({ left: 250, behavior: "smooth" });
});

function updateCategoryArrows() {
  const canScroll = catMenu.scrollWidth > catMenu.clientWidth;
  if (!canScroll) {
    catLeft.style.display = "none";
    catRight.style.display = "flex";
    return;
  }
  catLeft.style.display = catMenu.scrollLeft > 10 ? "flex" : "none";
  catRight.style.display = "flex";
}

catMenu.addEventListener("scroll", updateCategoryArrows);
window.addEventListener("resize", updateCategoryArrows);
updateCategoryArrows();

// Fetch and display product categories
async function loadCategories() {
  try {
    const response = await fetch("data/category.json");
    if (!response.ok) throw new Error("Failed to fetch data");

    const categories = await response.json();
    console.log("Fetched categories:", categories);
    displayCategories(categories);
  } catch (error) {
    console.error("Error:", error);
  }
}

function displayCategories(categories) {
  const container = document.getElementById("category-container");
  container.innerHTML = "";

  categories.forEach((category) => {
    const card = document.createElement("div");
    card.className = `
     flex flex-col items-center min-w-[80px] transition-transform duration-200
    `;
    card.innerHTML = `
      <img src="${category.image}" alt="${category.title || "category"}" 
           class="w-25 h-35 rounded-md" />
    `;
    container.appendChild(card);
  });
}
loadCategories();

// Fetch and display all products 
async function loadAllProducts() {
  try {
    const response = await fetch("data/product.json");
    if (!response.ok) throw new Error("Failed to fetch products.json");

    const data = await response.json();
    console.log("Fetched all products:", data);

    displayProducts(data.laundry, "laundrycareproduct-container");
    displayProducts(data.household, "householdproduct-container");
    displayProducts(data.rice, "riceproduct-container");
    displayProducts(data.haircare, "haircareproduct-container");
    displayProducts(data.dalandpulses, "dalandpulsesproduct-container");
    displayProducts(data.personalhygiene, "personalhygineproduct-container");
    displayProducts(data.oilsandghee, "oilsandgheeproduct-container");
    displayProducts(data.spicesandseasoning, "spicesandseasoningproduct-container");
    displayProducts(data.saltsugarandjaggery, "saltsugarandjaggeryproduct-container");
    displayProducts(data.chipsandcrisps, "chipsandcrispsproduct-container");
    displayProducts(data.namkeens, "namkeensproduct-container");
    displayProducts(data.softdrinks, "softdrinksproduct-container");
    displayProducts(data.juice, "juiceproduct-container");
    displayProducts(data.chocolate, "chocolateproduct-container");
    displayProducts(data.cake, "cakeproduct-container");
    displayProducts(data.instantfood, "instantfoodproduct-container");
    displayProducts(data.diary, "diaryproduct-container");
    displayProducts(data.milkdrinks, "milkdrinksproduct-container");
    displayProducts(data.bakery, "bakeryproduct-container");
    displayProducts(data.breakfastfood, "breakfastfoodproduct-container");
    displayProducts(data.biscuits, "biscuitsproduct-container");
    displayProducts(data.tea, "teaproduct-container");
    displayProducts(data.spread, "spreadproduct-container");
    displayProducts(data.oralcare, "oralcareproduct-container");
  }
  catch (error) {
    console.error("Error loading products:", error);
  }
}

function displayProducts(products, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "w-[140px] flex-shrink-0";

    card.innerHTML = `
      <div class="border border-gray-200 rounded-md p-1 relative">
        <img src="${product.image}" alt="${product.name}" class="w-36 h-36 object-contain rounded-md" />
        <button
          class="absolute bottom-2 right-2 bg-white border-2 border-pink-500 text-pink-600 text-xs font-semibold px-3 py-1 rounded-md">
          ADD
        </button>
      </div>
      <div class="mt-3 space-y-1">
        <div class="flex items-center gap-2">
          <span class="bg-green-600 text-white text-sm font-semibold px-2 py-0.5 rounded-md shadow">
            ₹${product.price}
          </span>
          <span class="text-gray-400 line-through text-sm">₹${product.oldPrice}</span>
        </div>
        <p class="text-green-600 text-xs font-semibold">₹${product.discount} OFF</p>
        <h3 class="text-sm font-semibold text-gray-800 leading-tight">${product.name}</h3>
        <p class="text-xs text-gray-600">${product.description}</p>
        <span class="inline-block bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded-md">
          ${product.badge}
        </span>
        <div class="flex items-center gap-1 text-xs text-green-600 font-medium mt-1">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
            class="w-4 h-4 text-green-500">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
          <span>${product.rating} (${product.reviews})</span>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

loadAllProducts();








