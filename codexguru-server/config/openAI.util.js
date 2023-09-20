import OpenAI from "openai";
import APIKEYS from "../CONSTANTS/APIKeys.js";

const openAiApiHandler = async (messages) => {
    const openai = new OpenAI({
        apiKey: APIKEYS.OPENAI_API_KEY,
    });

    // try {
    //     const chatCompletion = await openai.chat.completions.create({
    //         messages: messages,
    //         model: "gpt-3.5-turbo",
    //     });

    //     return chatCompletion;
    // } catch (error) {
    //     console.log(error);
    // }


    return new Promise((resolve, reject) => {
        try {
            const chatCompletion = openai.chat.completions.create({
                messages: messages,
                model: "gpt-3.5-turbo",
            });

            resolve(chatCompletion);
        } catch (error) {
            reject(error);
            console.log(error);
        }
    });
}

export { openAiApiHandler };