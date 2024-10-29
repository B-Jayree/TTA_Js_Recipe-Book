let recipes = [
    {
        title: "Spaghetti Bolognese",
        ingredients: "spaghetti, Ground Beef, Tomato Sauce, Onions, Garlic, Olive Oil",
        steps: "1. Boil Pasta. 2. Cook Ground Beef. 3. Add Sauce and garlic, Onion, and Garlic. 4. Mix with pasta."
    },

    {
        title: "Chicken Curry",
        ingredients: "chicken, Curry powder, coconut milk, Onions, Garlic, Ginger",
        steps: "1. Cook chicken. 2. Add onions, garlic, ginger. 3. Add coconut milk and curry powder. 4. simmer."
    },

    {
        title: "Vegetable Stir-fry",
        ingredients: "Broccoli, Carrots, Bell peppers, Soy sauce, Garlic, Olive Oil",
        steps: "1. Stir-fry vegetables on olive oil. 2. Add garlic and soy sauce. 3. serve with rice."
    },
    {
        title: "Pancakes",
        ingredients: "Flour, Eggs, Milk, Sugar, Baking Powder, Salt",
        steps: "Mix ingredients in a bowl. 2. Pour butter on a hot griddle. 3. Flip pancake when bubbles form."
    }

];

const displayRecipes = () => {
    const recipeList = document.querySelector('#recipeList');
   recipeList.innerHTML = "";

    if (recipeList) {
        recipes.forEach((recipe, index) => {
            const recipeCard = document.createElement("div");
            recipeCard.classList.add("bg-white", "p-4", "rounded", "shadow", "mb-4");
            recipeCard.innerHTML = `
          
    
                <h2 class="text-xl font-bold" id="titleDisplay-${index}">${recipe.title}</h2>
                 <input type="text" id="titleInput-${index}" class="hidden border p-2 w-full rounded-lg"
                  value="${recipe.title}">

                <p class="font-bold text-gray-600"><strong>Ingredients: &emsp;
                </strong>${recipe.ingredients}</p>
                <textarea id="ingredientsInput-${index}" class="hidden border p-2 w-full rounded-lg">$
                {recipe.ingredients}</textarea>


                <p class="text-sm"><strong>Steps: &emsp;</strong>${recipe.steps}</p>
                <textarea id="stepsInput-${index}" class="hidden border p-2 w-full rounded-lg">$
                {recipe.steps}</textarea>


                <button class="bg-blue-500 text-white px-2  py-1 rounded mt-2 id="editBtn-$"conclick="editRecipe(
                ${index})" >Edit</button>
               
                <button class="bg-red-500 text-white px-2  py-1 rounded mt-2" id="deleteBtn" onclick="deleteRecipe(${index})">
                 Delete</button>

                 <button class='bg-green-500 text-white px-2 py-1 rounded mt-2 hidden" id="saveBtn-${index}"
                 onclick="saveRecipes(${index})"Save</button>
            `;
            recipeList.appendChild(recipeCard);
        })
    }
}

const saveRecipeToLocalStorage = (recipe) => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
}

const loadRecipesFromLocalStorage = () => {
    const storedRecipes = localStorage.getItem("recipes");

    if (storedRecipes){
        recipes = JSON.parse(storedRecipes);
    }
}
const showError = (elementId, message) => {
    const errorElement = document.getElementById(elementId); 
    if (errorElement) {
        errorElement.innerText = message;
    errorElement.classList.remove("hidden");
    }
}

const hideError = (elementId) => {
    const errorElement = document.getElementById(elementId);
    errorElement.classList.add("hidden");
}

const addRecipe = () => {
    const recipeTitleInput = document.querySelector("#recipeTitle");
    const recipeIngredientsInput = document.querySelector("#recipeIngredients");
    const recipesInput = document.querySelector("#recipeSteps");

    const recipeTitle = recipeTitleInput.value.trim();
    const recipeIngredients = recipeIngredientsInput.value.trim();
    const recipeSteps = recipeStepsInput.value.trim();

}

//const editRecipe = (index) => {
   // const UpdateRecipeTitle = prompt("Enter new recipe title");
    //const UpdateRecipeIngredients = prompt("Enter new recipe ingredients", recipes[index].ingredients);
    //const UpdateRecipeSteps = prompt ("Enter the new recipe steps", recipes[index].steps);

   // if (UpdateRecipeTitle && UpdateRecipeIngredients && UpdateRecipeSteps) {
      //  recipes[index].title = UpdateRecipeTitle;
      //  recipes[index].ingredients = UpdateRecipeIngredients;
       // recipes[index].steps = UpdateRecipeSteps;
   // }
//}

const editRecipe = (index) => {
    document.getElementById(`titleDisplay-${index}`).classList.add("hidden");
    document.getElementById(`ingredientsDisplay-${index}`).classList.add("hidden");
    document.getElementById(`stepsDisplay-${index}`).classList.add("hidden");

    document.getElementById(`titleInput-${index}`).classList.remove("hidden");
    document.getElementById(`ingredientsInput-${index}`).classList.remove("hidden");
    document.getElementById(`stepsInput-${index}`).classList.remove("hidden");

    document.getElementById(`saveBtn-${index}`).classList.remove("hidden");
    document.getElementById(`cancelBtn-${index}`).classList.remove("hidden");
}

const saveRecipe = (index) => {
    const UpdateRecipeTitle = document.getElementById(`titleInput-${index}`).value.trim;
    const UpdateRecipeIngredients = document.getElementById(`ingredientsInput-${index}`).value.trim();
    const UpdateRecipeSteps = document.getElementById(`stepsInput-${index}`).value.trim();

    if (UpdateRecipeTitle && UpdateRecipeIngredients && UpdateRecipeSteps) {

        recipes[index].title = UpdateRecipeTitle;
        recipes[index].ingredients = UpdateRecipeIngredients;
        recipes[index].steps = UpdateRecipeSteps;
        
        saveRecipeToLocalStorage();
        displayRecipes();
 } else{
    alert("Please enter all the fields");
 }
}

const cancleEdit = (index) => {
    document.getElementById(`titleDisplay-${index}`).classList.remove("hidden");
    document.getElementById(`ingredientsDisplay-${index}`).classList.remove("hidden");
    document.getElementById(`stepsDisplay-${index}`).classList.remove("hidden");

    document.getElementById(`titleInput-${index}`).classList.add("hidden");
    document.getElementById(`ingredientsInput-${index}`).classList.add("hidden");
    document.getElementById(`stepsInput-${index}`).classList.add("hidden");

    document.getElementById(`saveBtn-${index}`).classList.add("hidden");
    document.getElementById(`cancelBtn-${index}`).classList.add("hidden");
}


const deleteRecipe = (index) => {
    recipes.splice(index, 1);
    saveRecipeToLocalStorage();
    displayRecipes();
}

const recipeForm = document.getElementById("recipeForm");

    if (recipeForm){
        document.getElementById('recipeForm').addEventListener('submit', addRecipe);
    }

       
displayRecipes();
loadRecipesFromLocalStorage();