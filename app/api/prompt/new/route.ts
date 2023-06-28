import Prompt from "@models/Prompt";
import { connectToDB } from "@utils/database";

export const POST = async (req: Request) => {
  const { prompt, userId, tag } = await req.json();
  try {
    await connectToDB();

    const promptObj = {
      prompt,
      tag,
      creator: userId,
    };

    const newPrompt = new Prompt(promptObj);

    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.log("== error ==", error);
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
