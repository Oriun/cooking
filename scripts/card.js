const recipe_card_template = document.querySelector("#recipe_card");

function createRecipeCard({ id, name, time, servings, ingredients }) {
  const recipe_card = recipe_card_template.content.cloneNode(true);

  recipe_card.querySelector(".name").textContent = name;
  recipe_card.querySelector(".time").textContent = `${time} minutes`;
  recipe_card.querySelector(".serving").textContent = `${servings} personnes`;

  const ingredientsNames = ingredients.map(
    (ingredient) => ingredient.ingredient
  );
  recipe_card.querySelector(".ingredients").textContent =
    ingredientsNames.join(", ");

  recipe_card.querySelector(".btn").onclick = function () {
    // Action lorsqu'on clique sur le bouton
  };

  return recipe_card;
}
