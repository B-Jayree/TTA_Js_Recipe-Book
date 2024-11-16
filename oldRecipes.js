let oldRecipes =[];
let recipes = [];

const saveRecipeToLocalStorage = () => {
    localStorage.setItem("oldRecipes", JSON.stringify(oldRecipes));
    localStorage.setItem("recipes", JSON.stringify(recipes));
   
}
const loadRecipesFromLocalStorage = () => {
    const storedOldRecipes = localStorage.getItem("oldRecipes");
    const storedRecipes = localStorage.getItem("recipes");


    if (storedOldRecipes){
        oldRecipes = JSON.parse(storedOldRecipes);
    }

    if(storedRecipes){
        recipes = JSON.parse(storedRecipes);
    }
};
const displayOldRecipes = () => {
    const oldRecipeList = document.getElementById('oldRecipeList');
    oldRecipeList.innerHTML = "";

    if(oldRecipeList){
        oldRecipes.forEach((oldRecipe,index) => {
            
       
        const recipeCard = document.createElement('div');
            recipeCard.classList.add('bg-gray-800','text-white', 'p-4', 'rounded', 'shadow', 'mb-4');

            recipeCard.innerHTML = `
            <h2 class="text-lg font-bold">${oldRecipe.title}</h2>
            <p class="text-sm text-blue-500"><strong>Ingredients: &emsp;</strong>${oldRecipe.Ingredients}</p>
            <p class="text-sm"><strong>Steps:</strong>${oldRecipe.Steps}</p>
            <button class="bg-blue-500 text-white px-3 py-1 rounded-md my-2" onclick="restoreRecipe(${index})">Restore Recipe</button>
            `;
            oldRecipeList.appendChild(recipeCard);
        })
    }
}

const restoreRecipe = (index) => {
    const restoredRecipes = oldRecipes.splice(index, 1)[0];
    recipes.push(restoredRecipes);
    displayOldRecipes(restoredRecipes[0]);  
    saveRecipeToLocalStorage();

}

loadRecipesFromLocalStorage();
displayOldRecipes();
