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
     <button class="bg-blue-500 text-white px-2 py-1 rounded mt-2">Edit</button>
      <button class="bg-red-500 text-white px-2 py-1 rounded mt-2">Delete</button>
`;
        recipeList.appendChild(recipeCard);
    })
}

const addRecipe = (event) => {
    event.preventDefault();
    const recipeTitle = document.querySelector('#recipeTitle').value.trim();
    const recipeIngredients = document.querySelector('#recipeIngredients').value.trim();
    const recipeSteps = document.querySelector('#recipeSteps').value.trim();

    if (recipeTitle !== "" && recipeIngredients !== "" && recipeSteps !== "") {

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

        displayRecipes();
    }
    } else {
        alert('Please fill out all fields');
    }
}
// const recipeForm = document.querySelector('#recipeForm');
// recipeForm.addEventListener('submit', addRecipe);

document.getElementById('recipeForm').addEventListener('submit', addRecipe);

displayRecipes();