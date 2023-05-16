const { Configuration, OpenAIApi } = require("openai");

exports.handler = async (event) => {
  if (event.requestContext.http.method == "POST") {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    })

    const ingredients = JSON.parse(event.body).ingredients
    const prompt = `
        Give me 3 recipes in a json list format, fitting this example: 
        [{'name': 'food_name', ingredients:['a', 'b', 'c'], steps:['do this', 'do that']}] 
        if the available ingredients are these, and i want to have to buy the absolute
        minimum extra: ${', '.join(ingredients)}
    `

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

    return response
  }
};
