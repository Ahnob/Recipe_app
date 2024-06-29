// // const API_key = " 5037eeaedf4b40b686bac31b98c5d9f8";
// const API_key = "5037eeaedf4b40b686bac31b98c5d9f8";
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

const API_key = "5037eeaedf4b40b686bac31b98c5d9f8";
const recipeList = document.getElementById("recipe-list");

function displayRecipes(recipes) {
  recipeList.innerHTML = "";
  recipes.forEach((recipe) => {
    const recipeItem = document.createElement("li");
    recipeItem.classList.add("each-container");

    const recipeImage = document.createElement("img");
    recipeImage.classList.add("img");
    recipeImage.src = recipe.image;
    recipeImage.alt = "recipe image";

    const recipeTitle = document.createElement("h2");
    recipeTitle.classList.add("text1");
    recipeTitle.textContent = recipe.title;

    const recipeIngredients = document.createElement("p");
    recipeIngredients.classList.add("text2");
    recipeIngredients.textContent =
      "Ingredients: " +
      recipe.extendedIngredients.map((ing) => ing.name).join(", ");

    const recipeInstructions = document.createElement("p");
    recipeInstructions.classList.add("text2");
    recipeInstructions.textContent = "Instructions: " + recipe.instructions;

    const viewButton = document.createElement("button");
    viewButton.textContent = "View Recipe";
    viewButton.addEventListener("click", () => {
      // Implement view recipe logic here (e.g., open a modal with full recipe details)
      alert(`Viewing recipe: ${recipe.title}`);
    });

    recipeItem.appendChild(recipeImage);
    recipeItem.appendChild(recipeTitle);
    recipeItem.appendChild(recipeIngredients);
    recipeItem.appendChild(recipeInstructions);
    recipeItem.appendChild(viewButton);
    recipeList.appendChild(recipeItem);
  });
}

async function searchRecipes() {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_key}`
    );

    if (!response.ok) {
      console.log(response.ok);
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
