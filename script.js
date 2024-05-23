// const API_key = "f1f640af004042e383a9f5c566898e4c";
// const recipeList = document.getElementById("recipe-list");
// function displayRecipes(recipes) {
//   recipeList.innerHTML = "";
//   recipes.forEach((recipe) => {
//     const recipeItem = document.createElement("li");
//     recipeItem.classList.add("each-container");
//     recipeImage = document.createElement("img");
//     recipeImage.src = recipe.image;
//     recipeImage.alt = "recipe image";

//     recipeItem.appendChild(recipeImage);
//     recipeList.appendChild(recipeItem);
//   });
// }

// async function searchRecipes() {
//   const response = await fetch(
//     `https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_key}`
//   );

//   const data = await response.json();

//   return data.recipes;
// }

// async function init() {
//   const recipes = await searchRecipes();
//   displayRecipes(recipes);
// }

// init();

const API_key = " 5037eeaedf4b40b686bac31b98c5d9f8";
const recipeList = document.getElementById("recipe-list");

function displayRecipes(recipes) {
  recipeList.innerHTML = "";
  recipes.forEach((recipe) => {
    const recipeItem = document.createElement("li");
    recipeItem.classList.add("each-container");
    recipeImage = document.createElement("img");
    recipeImage.src = recipe.image;
    recipeImage.alt = "recipe image";

    recipeItem.appendChild(recipeImage);
    recipeList.appendChild(recipeItem);
  });
}

async function searchRecipes() {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_key}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch recipes");
    }

    const data = await response.json();
    console.log(data); // Log the data
    return data.recipes;
  } catch (error) {
    console.error("Error fetching recipes:", error.message);
    return null; // Return null if there's an error
  }
}

async function init() {
  const recipes = await searchRecipes();
  if (recipes) {
    displayRecipes(recipes);
  } else {
    console.error("No recipes found.");
  }
}

init();
