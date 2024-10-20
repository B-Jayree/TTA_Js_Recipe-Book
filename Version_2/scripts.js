const recipes = [
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
    const recipeList = document.querySelector('#recipeList');
    recipeList.innerHTML = "";

    recipes.forEach((recipe) => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('bg-white', 'p-4', 'rounded', 'shadow', 'mb-4');

        recipeCard.innerHTML = `
     <h2 class="text-lg font-bold">${recipe.title}</h2>
     <p class="text-sm text-gray-500"><strong>Ingredients: &emsp;</strong>${recipe.Ingredients}</p>
     <p class="text-sm"><strong>Steps:&emsp;</strong>${recipe.Steps}</p>
`;
        recipeList.appendChild(recipeCard);
    })
}

const addRecipe = () => {
    const recipeTittleInput = document.querySelector('#recipeTitle');
    const recipeIngredientsInput = document.querySelector('#recipeIngredients');
    const recipeStepsInput = document.querySelector('#recipeSteps');

    const recipeTittle = recipeTittleInput.value.trim();
    const recipeIngredients = recipeIngredientsInput.value.trim();
    const recipeSteps = recipeStepsInput.value.trim();

    if(recipeTittle !== "" && recipeIngredients !== "" && recipeSteps !== ""){
        const newRecipe = {
            title: recipeTittle,
            Ingredients: recipeIngredients,
            Steps: recipeSteps
        
        }
recipes.push(newRecipe);
 

recipeTittleInput.value="";
recipeIngredientsInput.value="";
recipeStepsInput.value="";

        displayRecipes();

    }else{
        alert('Please fill out all fields');
    }
}

displayRecipes();

const addRecipeBtn = document.querySelector('#addRecipe');
addRecipeBtn.addEventListener('click', addRecipe);


