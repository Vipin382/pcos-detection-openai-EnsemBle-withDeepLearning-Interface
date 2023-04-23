import axios from "axios";
import { FormDataI, FormDataNewI } from "../Form";
import { Configuration, OpenAIApi } from "openai";
import { HaveP, NData } from "../DlSolution";

const configuration = new Configuration({
  organization: "org-uolxLt4CZIgW9GIt7590OJLt",
  // apiKey: process.env.OPENAI_API_KEY,
  apiKey: "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",
});

const instance = axios.create({
  baseURL: "http://localhost:8000/",
});

export const getData = async () => {
  try {
    const responses = await instance.get("/");
    return responses.data;
  } catch (error) {
    return error;
  }
};

export const GetPredictions = async (data: FormDataNewI) => {
  try {
    const response = await instance.post("/pcos", JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const GetDlPredictions = async (image: NData) => {
  const newinstance = axios.create({
    baseURL: "http://localhost:8000/",
  });
  try {
    const response = await newinstance.post(
      "/dlPcos",
      JSON.stringify({
        path: `./pics/${image.name}`,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

interface openAiData extends FormDataI {
  havePcos: boolean;
  vegetarian?: boolean;
}

export const getDatatFromOpenAi = async (Userdata: openAiData) => {
  const openai = new OpenAIApi(configuration);
  const prompt = Userdata.havePcos
    ? `Hello chat GPT my age is ${
        Userdata.age
      } and I want to improve my pcos problem my weight is ${
        Userdata.weight
      }kg and my height is ${Userdata.height} cm , i usually have ${
        Userdata.food ? "fast" : "healthy"
      } food, my menstruation cycle usually last ${
        Userdata.cycle
      } days please suggest me daily healthy both ${"vegetarian and non-vegetarian"} meal `
    : `Hello chat GPT my age is ${Userdata.age} my weight is ${
        Userdata.weight
      } kg, please suggest me daily both healthy ${"vegetarian and non-vegetarian"}  meal `;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 1000,
  });
  const data = response.data.choices[0].text;
  return data;
};

export const getGentFromOpenAi = async (res: HaveP) => {
  const openai = new OpenAIApi(configuration);
  const prompt =
    res.havePcos === "true"
      ? "Can you provide a healthy diet for PCOS and PCOD both"
      : "can you provide diet for good health";
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 1000,
  });
  const data = response.data.choices[0].text;
  return data;
};
