const API_key = "1f640af004042e383a9f5c566898e4c";

async function getRecipes() {
  const response = await fetch(
    `https://api.spoonacular.com/recipes/random?number=12&apiKey=${Api_key}`
  );
  const data = await response.json();
  return data.recipes;
}

async function init() {
  const recipes = await getRecipes();
  console.log(recipes);
}

init();
