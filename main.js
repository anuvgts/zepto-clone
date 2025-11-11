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
    if (index === placeholders.length)
    {
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
        const response = await fetch("data/products.json");
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


