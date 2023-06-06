<script>
  import { Input, Button, Icon, Spinner, Collapse, Card } from "sveltestrap";
  import { Jellyfish } from "svelte-loading-spinners";

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
  ];

  let query = "";
  const lambdaUrl =
    "https://weqmnzytdn6ojmdyavinuzf2qy0prcpa.lambda-url.us-west-2.on.aws/";

  let recipes = [];
  let loading = false;

  const addIngredient = (event) => {
    const thing = event.originalTarget.firstChild.textContent;

    query = thing + ", " + query;
  };

  const getRecipes = () => {
    loading = true
    const payload = {
      ingredients: query.split(","),
    };

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };

    console.log(options);

    fetch(lambdaUrl, options)
      .then((response) => response.json())
      .then((response) => {
        loading = false
        recipes = response
      })
      .catch((err) => console.error(err));
  };
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
  />
</svelte:head>

<main>
  <div class="content">
    <p>
      <Input type="text" value={query} class="inp-search" />
      <Button class="btn-ok" on:click={getRecipes}
        ><Icon name="search-heart" /></Button
      >
    </p>

    <p>Add common ingredients</p>
    <p>
      {#each popular_ingredients as ingredient}
        <Button on:click={addIngredient}>{ingredient}</Button>
      {/each}
    </p>

    <div>
      {#if loading}
      <p class="loader">
        <Jellyfish
          size="120"
          color="#FF3E00"
          unit="px"
          duration="2s"
        />
      </p>
      {:else}
      <ul>
        {#each recipes as recipe}
          <li>
            <p>{recipe.name}</p>
            <p />
            <ul>
              {#each recipe.ingredients as ingredient}
                <li>{ingredient}</li>
              {/each}
            </ul>

            <p />
            <ul>
              {#each recipe.steps as step}
                <li>{step}</li>
              {/each}
            </ul>
          </li>
        {/each}
      </ul>
      {/if}
    </div>
  </div>
</main>
