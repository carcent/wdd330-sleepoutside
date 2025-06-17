const apiID = 'your_edamam_app_id'; // Replace with your actual App ID
const apiKey = 'your_edamam_api_key'; // Replace with your actual App Key

// DOM Elements
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const resultsSection = document.getElementById("results");
const lastUpdated = document.getElementById("lastUpdated");
const currentTime = document.getElementById("currentTime");

// Search button event
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    resultsSection.innerHTML = "<p>Loading recipes...</p>";
    fetchRecipes(query);
  }
});

// Fetch recipes from Edamam API
async function fetchRecipes(query) {
  try {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${apiID}&app_key=${apiKey}`);
    if (!response.ok) throw new Error("Failed to fetch data");
    
    const data = await response.json();
    if (data.hits.length === 0) {
      resultsSection.innerHTML = "<p>No recipes found. Try another keyword.</p>";
    } else {
      displayRecipes(data.hits);
    }
  } catch (error) {
    resultsSection.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}

// Render recipe cards
function displayRecipes(recipes) {
  resultsSection.innerHTML = "";
  recipes.forEach(({ recipe }) => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");
    recipeCard.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.label}" />
      <h3>${recipe.label}</h3>
      <p>Calories: ${Math.round(recipe.calories)}</p>
      <a href="${recipe.url}" target="_blank">View Recipe</a>
    `;
    resultsSection.appendChild(recipeCard);
  });
}

// Display last updated date (e.g., "June 14, 2025")
lastUpdated.textContent = new Date(document.lastModified).toLocaleDateString('en-US', {
  year: 'numeric', month: 'long', day: 'numeric'
});

// Update and show current time
function updateCurrentTime() {
  const now = new Date();
  currentTime.textContent = now.toLocaleTimeString('en-US');
}
updateCurrentTime(); // initial call
setInterval(updateCurrentTime, 1000); // update every second
