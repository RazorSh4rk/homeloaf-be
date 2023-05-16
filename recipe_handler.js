const { Configuration, OpenAIApi } = require("openai");

const getRecipe = async (ingredients, key) => {
  if (!key) require("dotenv").config();

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  print("KEY " + configuration.apiKey)

  const ingredients = JSON.parse(event.body).ingredients;
  const prompt = `
          Give me 3 recipes in a json list format, fitting this example: 
          [{'name': 'food_name', ingredients:['a', 'b', 'c'], steps:['do this', 'do that']}] 
          if the available ingredients are these, and i want to have to buy the absolute
          minimum extra: ${ingredients.join(", ")}
      `;

  const openai = new OpenAIApi(configuration);
  const res = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 2048,
    temperature: 0,
  });

  const response = {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(res),
  };

  return response;
};

module.exports = getRecipe;
