let recipes = [
    {
        title: "Spaghetti Bolognese",
        Ingredients: "Spaghetti, Ground Beef , Tomato Sauce, Onion, Garlic ,Olive Oil",
        Steps: "1.Boil pasta. 2. Cook Ground Beef. 3. Add Sauce and Garlic. 4. Mix with pasta. ",

    },
    {
        title: "Chicken Curry",
        Ingredients: "Chicken, Curry Powder, Coconut Milk, Onion, Garlic ,Ginger",
        Steps: "1.Boil pasta. 2. Cook Ground Beef. 3. Add Sauce and Garlic. 4. Mix with pasta. ",

    },
    {
        title: "Vegetable Stir-fry",
        Ingredients: "Brocoli, Carrots, Bell Pepers, Soy sauce, Garlic ,Olive Oil",
        Steps: "1. Stir-fry vegetables in olive oil. 2. Add garlic and soy sauce. 3.Serve with rice. ",

    }

]
/**
 * This function displays the list of recipes on the webpage.
 */
const displayRecipes = () => {
    const recipeList = document.getElementById('recipeList');
    recipeList.innerHTML = "";

    recipes.forEach((recipe, index) => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('bg-white', 'p-4', 'rounded', 'shadow', 'mb-4');

        recipeCard.innerHTML = `
     <h2 class="text-lg font-bold">${recipe.title}</h2>
     <p class="text-sm text-gray-500"><strong>Ingredients: &emsp;</strong>${recipe.Ingredients}</p>
     <p class="text-sm"><strong>Steps:&emsp;</strong>${recipe.Steps}</p>
     <button class="bg-blue-500 text-white px-2 py-1 rounded mt-2" onclick="editRecipe(${index})">Edit</button>
      <button class="bg-red-500 text-white px-2 py-1 rounded mt-2" onclick="deleteRecipe(${index})">Delete</button>
`;
        recipeList.appendChild(recipeCard);
    })
}

const saveRecipeToLocalStorage = () => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
}

const loadRecipesFromLocalStorage = () => {
    const storedRecipes = localStorage.getItem("recipes");
    if(storedRecipes){
        recipes = JSON.parse(storedRecipes);
    }
}

const showError = (elementId, message) => {
    const errorElement = document.getElementById(elementId);
    errorElement.innerText = message;
    errorElement.classList.remove("hidden");
}

const hideError = (elementId) => {
    const errorElement = document.getElementById(elementId);
    errorElement.classList.add("hidden");
}

const addRecipe = (event) => {
    event.preventDefault();
    const recipeTitle = document.getElementById('recipeTitle').value.trim();
    const recipeIngredients = document.getElementById('recipeIngredients').value.trim();
    const recipeSteps = document.getElementById('recipeSteps').value.trim();


    
     hideError("titleError");
     hideError("IngredientsError");
     hideError("stepsError");

     let isValid = true;
     if (recipeTitle === "") {
        showError("titleError", "Please enter the Recipe title");
        isValid = false;
             }
             if (recipeIngredients === "") {
                showError("IngredientsError", "Please enter the Recipe ingredients");
                isValid = false;
                     }
                     if (recipeSteps === "") {
                        showError("stepsError", "Please enter the Recipe steps");
                        isValid = false;
                             }
          if (isValid) {
        const isDuplicate = recipes.some((recipe) => recipe.title.toLocaleLowerCase() ===  recipeTitle.toLocaleLowerCase());
        if (isDuplicate){
            alert("Recipe Already exists");
        } 
        else{
            const newRecipe = {
            title : recipeTitle,
            Ingredients : recipeIngredients,
            Steps : recipeSteps
        }
        recipes.push(newRecipe);

        document.getElementById("recipeTitle").value = "";
        document.getElementById("recipeIngredients").value = "";
        document.getElementById("recipeSteps").value = "";

        saveRecipeToLocalStorage();
        displayRecipes();
    }
}
 
}

const deleteRecipe = (index) => {
    recipes.splice(index, 1);
    saveRecipeToLocalStorage();
    displayRecipes();
}

const editRecipe = (index) => {
    const updateRecipeTitle = prompt("Enter the new recipe title", recipes[index].title);
    const updateRecipeIngrediendients = prompt("Enter the new recipe ingredients", recipes[index].Ingredients);
    const updateRecipeSteps = prompt("Enter the new recipe steps", recipes[index].Steps);

    if(updateRecipeTitle && updateRecipeIngrediendients && updateRecipeSteps){
        recipes[index].title = updateRecipeTitle;
        recipes[index].Ingredients = updateRecipeIngrediendients;
        recipes[index].Steps = updateRecipeSteps;

        displayRecipes();
        saveRecipeToLocalStorage();
    }
}



document.getElementById('recipeForm').addEventListener('submit', addRecipe);


loadRecipesFromLocalStorage();
displayRecipes();