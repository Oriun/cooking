normalizeAppliances();
let keywords = getKeywords(recipes);

const searchList = document.querySelector("#search-list");
const selectedKeywordsList = document.querySelector("#selected-keywords");
const searchInput = document.querySelector("#search-input");
const ingredientsInput = document.querySelector("#ingredients-input");
const appliancesInput = document.querySelector("#appliances-input");
const ustensilsInput = document.querySelector("#ustensils-input");

let searchString = "";
let ingredients = [];
let appliances = [];
let ustensils = [];

const ingredientsColors = ["#3282F7", "white"];
const appliancesColors = ["#2EB475", "white"];
const ustensilsColors = ["#ED6454", "white"];

searchInput.oninput = (event) => {
  searchString = event.target.value;
  refresh();
};

const ingredientsSelect = new CustomSelect(
  ingredientsInput,
  "Ingrédients",
  ...ingredientsColors
);
ingredientsSelect.onselect = (selection) => {
  ingredients.push(selection);
  refresh();
};

const appliancesSelect = new CustomSelect(
  appliancesInput,
  "Appareils",
  ...appliancesColors
);
appliancesSelect.onselect = (selection) => {
  appliances.push(selection);
  refresh();
};

const ustensilsSelect = new CustomSelect(
  ustensilsInput,
  "Ustensiles",
  ...ustensilsColors
);
ustensilsSelect.onselect = (selection) => {
  ustensils.push(selection);
  refresh();
};

function refresh() {
  const recipeToDisplay = recipes
    .filter(matchesKeywords(appliances, ustensils, ingredients))
    .filter(matchesString(searchString));

  keywords = getKeywords(recipeToDisplay);
  console.log(keywords, appliances, ustensils, ingredients);

  ingredientsSelect.items = keywords.ingredients.filter(
    (item) => !ingredients.includes(item)
  );
  appliancesSelect.items = keywords.appliances.filter(
    (item) => !appliances.includes(item)
  );
  ustensilsSelect.items = keywords.ustensils.filter(
    (item) => !ustensils.includes(item)
  );

  selectedKeywordsList.replaceChildren();
  selectedKeywordsList.append(
    ...makeSelectedOptionElements(
      ingredients,
      function (item) {
        ingredients = ingredients.filter((ingredient) => ingredient !== item);
        refresh();
      },
      ...ingredientsColors
    )
  );
  selectedKeywordsList.append(
    ...makeSelectedOptionElements(
      appliances,
      function (item) {
        appliances = appliances.filter((ingredient) => ingredient !== item);
        refresh();
      },
      ...appliancesColors
    )
  );
  selectedKeywordsList.append(
    ...makeSelectedOptionElements(
      ustensils,
      function (item) {
        ustensils = ustensils.filter((ingredient) => ingredient !== item);
        refresh();
      },
      ...ustensilsColors
    )
  );

  searchList.replaceChildren(...recipeToDisplay.map(createRecipeCard));
}

window.onload = refresh;
