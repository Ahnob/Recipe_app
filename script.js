// const API_key = "7935b6a201cc4f2395a899025048717c";
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

const API_key = " f1f640af004042e383a9f5c566898e4c";

async function getRandomRecipes() {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_key}`
    );
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorMessage}`
      );
    }
    const data = await response.json();
    if (!data.recipes || !Array.isArray(data.recipes)) {
      throw new Error(
        "Invalid response format: recipes not found or not an array"
      );
    }
    return data.recipes;
  } catch (error) {
    console.error("Error fetching random recipes:", error);
    return []; // Return an empty array or handle the error as needed
  }
}

async function init() {
  try {
    const recipes = await getRandomRecipes();
    recipes.forEach((recipe) => {
      console.log(recipe.title); // Example: Accessing the title property
    });
  } catch (error) {
    console.error("Error initializing:", error);
  }
}

init();
