<script>
  import { Input, Icon, Spinner, Collapse } from "sveltestrap";
  import Button from "@smui/button";
  import TextField from "@smui/textfield";
  import Item from "@smui/list";
  import Card from "@smui/card";
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
  let hideUI = false;

  const addIngredient = (event) => {
    const thing = event.target.parentElement.innerText.toLowerCase();

    query = thing + ", " + query;
  };

  const reset = () => {
    hideUI = false;
  };

  const getRecipes = () => {
    loading = true;
    hideUI = true;

    const payload = {
      ingredients: query.split(","),
    };

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };

    fetch(lambdaUrl, options)
      .then((response) => response.json())
      .then((response) => {
        loading = false;
        recipes = response;
      })
      .catch((err) => console.error(err));
  };
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
  />
  <link
    rel="stylesheet"
    href="node_modules/svelte-material-ui/themes/svelte-dark.css"
    media="screen"
  />
</svelte:head>

<main>
  <div class="content">
    <div>
      <h1>
        {#if !hideUI && !loading}
          🤖 Hello! I'm an AI that helps you cook with things you already have
          at home!
        {/if}

        {#if hideUI && loading}
          🤖 Hold on, I'm thinking...
        {/if}

        {#if hideUI && !loading}
          🤖 I found some recipes for you!
        {/if}
      </h1>
    </div>

    {#if !hideUI}
      <div>
        <p>🤖 Add some things you have in your fridge</p>
        <TextField
          style="color: white !important; width: 100%;"
          variant="standard"
          type="text"
          label="stuff in my fridge"
          bind:value={query}
          class="inp-search"
        />
        <Button
          style="background-color: #F44336"
          variant="raised"
          class="btn-ok"
          on:click={getRecipes}><Icon name="search-heart" /></Button
        >
      </div>

      <p>🤖 or pick some common ingredients</p>
      <p>
        {#each popular_ingredients as ingredient}
          <Button
            style="background-color: #F44336;"
            class="ingredient-btn"
            variant="raised"
            on:click={addIngredient}>{ingredient}</Button
          >
        {/each}
      </p>
    {/if}

    <div>
      {#if loading}
        <p class="loader">
          <Jellyfish size="120" color="#FF3E00" unit="px" duration="2s" />
        </p>
      {:else}
        {#if hideUI}
          <div>
            <Button
              style="background-color: #F44336;"
              class="ingredient-btn"
              variant="raised"
              on:click={reset}>🤖 Go again</Button
            >
          </div>
        {/if}
        <div style="margin-top: 1%; padding: unset !important;">
          {#each recipes as recipe}
            <Card
              class="recipe-card"
              style="display: flex; flex-direction: column; align-items: center; justify-content: center; margin: 3%; padding: 3%; text-align: center;"
            >
              <p><u>📖 {recipe.name}</u></p>
              <p />
              <p><u>Ingredients</u></p>
              <ul
                style="display: flex; justify-content: space-between; min-width: 50%;"
              >
                {#each recipe.ingredients as ingredient}
                  <Item style="margin: 1%;">🍜 {ingredient}</Item>
                {/each}
              </ul>

              <p />
              <p><u>Steps</u></p>
              <ul>
                {#each recipe.steps as step}
                  <Item>✔️ {step}</Item>
                {/each}
              </ul>
            </Card>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</main>
