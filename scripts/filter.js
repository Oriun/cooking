function getKeywords(data) {
  const appliances = new Set();
  const ustensils = new Set();
  const ingredients = new Set();

  for (const recipe of data) {
    appliances.add(recipe.appliance);
    recipe.ustensils.forEach((ustensil) => ustensils.add(ustensil));
    recipe.ingredients.forEach((ingredient) =>
      ingredients.add(ingredient.ingredient)
    );
  }

  return {
    appliances,
    ustensils,
    ingredients
  };
}

function normalizeAppliances() {
  for (let i = 0; i < recipes.length; i++) {
    if (["Casserolle", "Casserolle."].includes(recipes[i].appliance))
      recipes[i].appliance = "Casserole";
  }
}

function matchesString(filterValue) {
  const lowerCaseFilterValue = filterValue.toLowerCase();

  return function (recipe) {
    // On cherche dans le nom, la description et les ingrédients

    const RecipeName = recipe.name.toLowerCase();
    if (RecipeName.includes(lowerCaseFilterValue)) return true;

    const description = recipe.description.toLowerCase();
    if (description.includes(lowerCaseFilterValue)) return true;

    for (const ingredient of recipe.ingredients) {
      const ingredientName = ingredient.ingredient.toLowerCase();
      if (ingredientName.includes(lowerCaseFilterValue)) return true;
    }

    return false;
  };
}

function matchesKeywords(appliances, ustensils, ingredients) {
  return function (recipe) {
    if (appliances.length > 0) {
      if (appliances.some((item) => item !== recipe.appliance)) return false;
    }

    if (ustensils.length > 0) {
      for (const ustensil of ustensils) {
        if (!recipe.ustensils.includes(ustensil)) return false;
      }
    }

    if (ingredients.length > 0) {
      for (const ingredient of ingredients) {
        if (!ingredients.find((item) => item.ingredient === ingredient))
          return false;
      }
    }

    return true;
  };
}
