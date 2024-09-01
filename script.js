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

    // Create a wrapper for instructions and buttons
    const instructionsWrapper = document.createElement("div");
    instructionsWrapper.classList.add("instructions-wrapper");

    const recipeInstructions = document.createElement("p");
    recipeInstructions.classList.add("text2");
    const maxLength = 100; // Set a maximum length for the displayed instructions
    const truncatedInstructions =
      recipe.instructions.substring(0, maxLength) + "...";

    recipeInstructions.innerHTML = `Instructions: ${truncatedInstructions} `;

    // Create the "Read More" button
    const readMoreButton = document.createElement("button");
    readMoreButton.textContent = "Read More";
    readMoreButton.classList.add("read-more-button");

    // Create the "Read Less" button
    const readLessButton = document.createElement("button");
    readLessButton.textContent = "Read Less";
    readLessButton.classList.add("read-less-button");
    readLessButton.style.display = "none"; // Initially hide the "Read Less" button

    readMoreButton.addEventListener("click", () => {
      recipeInstructions.innerHTML = `Instructions: ${recipe.instructions} `;
      readMoreButton.style.display = "none"; // Hide "Read More" button
      readLessButton.style.display = "inline"; // Show "Read Less" button
    });

    readLessButton.addEventListener("click", () => {
      recipeInstructions.innerHTML = `Instructions: ${truncatedInstructions} `;
      readLessButton.style.display = "none"; // Hide "Read Less" button
      readMoreButton.style.display = "inline"; // Show "Read More" button
    });

    instructionsWrapper.appendChild(recipeInstructions);
    instructionsWrapper.appendChild(readMoreButton);
    instructionsWrapper.appendChild(readLessButton);

    // Create the "View Recipe" button
    const viewButton = document.createElement("button");
    viewButton.textContent = "View Recipe";
    viewButton.classList.add("view-button");

    const fullInstructions = document.createElement("ol");
    fullInstructions.classList.add("full-instructions");
    fullInstructions.style.display = "none"; // Hide the full instructions initially

    viewButton.addEventListener("click", () => {
      if (fullInstructions.style.display === "none") {
        // Split the instructions into steps and add as list items
        const steps = recipe.instructions
          .split(/[.\n]/)
          .filter((step) => step.trim() !== "");
        fullInstructions.innerHTML = ""; // Clear previous content
        steps.forEach((step, index) => {
          const li = document.createElement("li");
          li.textContent = step.trim();
          fullInstructions.appendChild(li);
        });
        fullInstructions.style.display = "block";
        viewButton.textContent = "Hide Recipe"; // Change button text
      } else {
        fullInstructions.style.display = "none";
        viewButton.textContent = "View Recipe"; // Change button text back
      }
    });

    // Add elements to the recipe item
    recipeItem.appendChild(recipeImage);
    recipeItem.appendChild(recipeTitle);
    recipeItem.appendChild(recipeIngredients);
    recipeItem.appendChild(instructionsWrapper); // Add the instructions wrapper
    recipeItem.appendChild(fullInstructions); // Add full instructions after the instructions wrapper
    recipeItem.appendChild(viewButton); // Add the "View Recipe" button below the instructions

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
