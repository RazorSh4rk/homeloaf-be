import { getRecipe } from "recipe_handler.js";

exports.handler = async (event) => {
  if (event.requestContext.http.method == "POST") {
    const ingredients = JSON.parse(event.body).ingredients;
    return await getRecipe(ingredients);
  }
};
