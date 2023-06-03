<script>
  import { Styles, Input, Button, Icon } from "sveltestrap"

  const popular_ingredients = [
    "Salt",
    "Pepper",
    "Olive oil",
    "Vegetable oil",
    "Butter",
    "Eggs",
    "Milk",
    "Flour",
    "Sugar",
    "Garlic",
    "Onion",
    "Lemon",
    "Lime",
    "Soy sauce",
    "Worcestershire sauce",
    "Ketchup",
    "Mustard",
    "Mayonnaise",
    "Vinegar",
    "Balsamic vinegar",
    "Red wine vinegar",
    "Apple cider vinegar",
    "Honey",
    "Maple syrup",
    "Brown sugar",
    "Cinnamon",
    "Nutmeg",
    "Paprika",
    "Chili powder",
    "Cumin",
    "Rosemary",
    "Thyme",
    "Oregano",
    "Basil",
    "Parsley",
    "Bay leaves",
    "Chicken broth/stock",
    "Beef broth/stock",
    "Vegetable broth/stock",
    "Rice",
    "Pasta",
    "Canned tomatoes",
    "Tomato sauce",
    "Tomato paste",
    "Frozen vegetables",
    "Frozen fruits",
    "Bread crumbs",
    "Nuts (e.g. almonds, walnuts, peanuts)",
    "Chocolate chips",
    "Marshmallows",
  ]

  let query = ""
  const lambdaUrl =
    "https://weqmnzytdn6ojmdyavinuzf2qy0prcpa.lambda-url.us-west-2.on.aws/"

  const addIngredient = (event) => {
    const thing = event.originalTarget.firstChild.textContent

    query = thing + ", " + query
  }

  const getRecipes = () => {
    const payload = {
      ingredients: query.split(",")
    }

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }

    fetch(lambdaUrl,options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err))
  }
</script>

<main>
  <div>
    <p>
      {#each popular_ingredients as ingredient}
        <Button on:click={addIngredient}>{ingredient}</Button>
      {/each}
    </p>

    <Input type="text" value={query} />
    <Button on:click={getRecipes}>Go</Button>
    <Icon name="search-heart" />
  </div>
</main>

<style>
</style>
