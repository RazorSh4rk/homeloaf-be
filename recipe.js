const { Configuration, OpenAIApi } = require("openai");

exports.handler = async (event) => {
  const ingredients = JSON.parse(event.body).ingredients;

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = `
              Give me 3 recipes in a json list format, fitting this example: 
              [{"name": "food_name", "ingredients": ["a", "b", "c"], "steps": ["do this", "do that"]}],
              don't include any text that's not json parsable  
              if the available ingredients are these, and i want to have to buy the absolute
              minimum extra: ${ingredients.join(", ")}
          `;

  const openai = new OpenAIApi(configuration);
  const res = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 2048,
    temperature: 1,
  });

  result = JSON.parse(res.data.choices[0].text.trim())

  const response = {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(result),
  };

  return response;
};
