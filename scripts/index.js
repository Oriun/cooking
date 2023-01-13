normalizeAppliances();
let keywords = getKeywords(recipes);

const searchList = document.querySelector("#search-list");
const searchInput = document.querySelector("#search-input");
const ingredientsInput = document.querySelector("#ingredients-input");
const appliancesInput = document.querySelector("#appliances-input");
const ustensilsInput = document.querySelector("#ustensils-input");

let searchString = "";
let ingredients = [];
let appliances = [];
let ustensils = [];

searchInput.oninput = (event) => {
  searchString = event.target.value;
  refresh();
};

const ingredientsSelect = new CustomSelect(ingredientsInput);
ingredientsSelect.onselect = (selection) => {
  ingredients.push(selection);
  refresh();
};

const appliancesSelect = new CustomSelect(appliancesInput);
appliancesSelect.onselect = (selection) => {
  appliances.push(selection);
  refresh();
};

const ustensilsSelect = new CustomSelect(ustensilsInput);
ustensilsSelect.onselect = (selection) => {
  ustensils.push(selection);
  refresh();
};

function refresh() {
  const recipeToDisplay = recipes
    .filter(matchesKeywords(appliances, ustensils, ingredients))
    .filter(matchesString(searchString));

  keywords = getKeywords(recipeToDisplay);

  ingredientsSelect.items = keywords.ingredients;
  appliancesSelect.items = keywords.appliances;
  ustensilsSelect.items = keywords.ustensils;

  searchList.replaceChildren(...recipeToDisplay.map(createRecipeCard));
}

window.onload = refresh;
