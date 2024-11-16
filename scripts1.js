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

];
let oldRecipes =[];
/**
 * This function displays the list of recipes on the webpage.
 */
const displayRecipes = () => {
    const recipeList = document.getElementById('recipeList');
    recipeList.innerHTML = "";

    if(recipeList){ 
        recipes.forEach((recipe, index) => {
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('bg-gray-800','text-white', 'p-4', 'rounded', 'shadow', 'mb-4');
    
            recipeCard.innerHTML = `
         <h2 class="text-lg font-bold" id="titleDisplay-${index}">${recipe.title}</h2>
         <input type="text" id="titleInput-${index}" class="text-black hidden border p-2 w-full mb-2 rounded-lg" value="${recipe.title}">

         <p class="text-sm text-blue-500" id="ingredientsDisplay-${index}"><strong>Ingredients: &emsp;</strong>${recipe.Ingredients}</p>
         <textarea id="ingredientsInput-${index}" class="text-black hidden border p-2 w-full mb-2 rounded-lg">${recipe.Ingredients}</textarea>


         <p class="text-sm" id="stepsDisplay-${index}"><strong>Steps:&emsp;</strong>${recipe.Steps}</p>
         <textarea id="stepsInput-${index}" class="hidden text-black border p-2 w-full mb-2 rounded-lg">${recipe.Steps}</textarea>


         <button class="bg-blue-500 text-white px-2 py-1 rounded mt-2" id="editBtn-${index}"  onclick="editRecipe(${index})">Edit</button>
          <button class="bg-red-500 text-white px-2 py-1 rounded mt-2" id="deleteBtn-${index}" onclick="deleteRecipe(${index})">Delete</button>

          <button class="hidden bg-green-500 text-white px-2 py-1 rounded mt-2" id="saveBtn-${index}" onclick="saveRecipe(${index})">Save</button>
          <button class="hidden bg-gray-500 text-white px-2 py-1 rounded mt-2" id="cancelBtn-${index}" onclick="cancelEdit(${index})">Cancel</button>
    `;
            recipeList.appendChild(recipeCard);
        })
    }   
}

const saveRecipeToLocalStorage = () => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
    localStorage.setItem("oldRecipes", JSON.stringify(oldRecipes))
}

const loadRecipesFromLocalStorage = () => {
    const storedRecipes = localStorage.getItem("recipes");
    const storedOldRecipes = localStorage.getItem("oldRecipes");

    if (storedOldRecipes){
        oldRecipes = JSON.parse(storedOldRecipes);
    }

    if(storedRecipes){
        recipes = JSON.parse(storedRecipes);
    }
}

const showError = (elementId, message) => {
    const errorElement = document.getElementById(elementId);
    if(errorElement){
    errorElement.innerText = message;
    errorElement.classList.remove("hidden");
}
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
    const deletedRecipe = recipes.splice(index, 1)[0];
    oldRecipes.push(deletedRecipe)
    saveRecipeToLocalStorage();
    displayRecipes();
}

// const editRecipe = (index) => {
//     const updateRecipeTitle = prompt("Enter the new recipe title", recipes[index].title);
//     const updateRecipeIngrediendients = prompt("Enter the new recipe ingredients", recipes[index].Ingredients);
//     const updateRecipeSteps = prompt("Enter the new recipe steps", recipes[index].Steps);

//     if(updateRecipeTitle && updateRecipeIngrediendients && updateRecipeSteps){
//         recipes[index].title = updateRecipeTitle;
//         recipes[index].Ingredients = updateRecipeIngrediendients;
//         recipes[index].Steps = updateRecipeSteps;

//         displayRecipes();
//         saveRecipeToLocalStorage();
//     }
// }

const editRecipe = (index) => {

    document.getElementById(`titleDisplay-${index}`).classList.add('hidden');
    document.getElementById(`ingredientsDisplay-${index}`).classList.add('hidden');
    document.getElementById(`stepsDisplay-${index}`).classList.add('hidden');  
    document.getElementById(`editBtn-${index}`).classList.add('hidden');
    document.getElementById(`deleteBtn-${index}`).classList.add('hidden');

    document.getElementById(`titleInput-${index}`).classList.remove('hidden');
    document.getElementById(`ingredientsInput-${index}`).classList.remove('hidden');
    document.getElementById(`stepsInput-${index}`).classList.remove('hidden');

    document.getElementById(`saveBtn-${index}`).classList.remove('hidden');
    document.getElementById(`cancelBtn-${index}`).classList.remove('hidden');

}

const cancelEdit = (index) => {
    document.getElementById(`titleDisplay-${index}`).classList.remove('hidden');
    document.getElementById(`ingredientsDisplay-${index}`).classList.remove('hidden');
    document.getElementById(`stepsDisplay-${index}`).classList.remove('hidden');  
    document.getElementById(`editBtn-${index}`).classList.remove('hidden');
    document.getElementById(`deleteBtn-${index}`).classList.remove('hidden');

    document.getElementById(`titleInput-${index}`).classList.add('hidden');
    document.getElementById(`ingredientsInput-${index}`).classList.add('hidden');
    document.getElementById(`stepsInput-${index}`).classList.add('hidden');

    document.getElementById(`saveBtn-${index}`).classList.add('hidden');
    document.getElementById(`cancelBtn-${index}`).classList.add('hidden');
}
saveRecipe = (index) =>{
    const updatedTitle = document.getElementById(`titleInput-${index}`).value.trim();
    const updatedIngredients = document.getElementById(`ingredientsInput-${index}`).value.trim();
    const updatedSteps = document.getElementById(`stepsInput-${index}`).value.trim();

    if(updatedTitle && updatedIngredients && updatedSteps){
        recipes[index].title = updatedTitle;
        recipes[index].Ingredients = updatedIngredients;
        recipes[index].Steps = updatedSteps;
        displayRecipes();
        saveRecipeToLocalStorage();
}
else{
    alert("Please fill all the fields");
}
}



const recipeForm = document.getElementById('recipeForm');

if(recipeForm){
document.getElementById('recipeForm').addEventListener('submit', addRecipe);
}
// localStorage.clear();
loadRecipesFromLocalStorage();
displayRecipes();