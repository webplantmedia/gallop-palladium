import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const generatePrompts = async (model, prompt) => {
  const response = await openai.createCompletion({
    model: model,
    prompt: prompt,
    temperature: 0,
    max_tokens: 7,
  });
  return response;
};
