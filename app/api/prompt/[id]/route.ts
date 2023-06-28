import { connectToDB } from "@utils/database";
import Prompt from "@models/Prompt";
import { IdynamicIdRoute } from "@interfaces/interfaces";

export const GET = async (req: Request, { params }: IdynamicIdRoute) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt)
      return new Response(
        `Failed to get the prompt: ${params.id}. Prompt doesn't exist!`,
        { status: 404 }
      );

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.log("== error ==", error);
    return new Response(
      `Failed to fetch the prompt ${params.id}. Either the prompt doesn't exist or the system has failed.`,
      { status: 500 }
    );
  }
};

export const PUT = async (req: Request, { params }: IdynamicIdRoute) => {
  const { prompt, tag } = await req.json();

  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt)
      return new Response(
        `Failed to update the prompt: ${params.id}. Prompt doesn't exist!`,
        { status: 404 }
      );

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();

    return new Response(`Successfully update the prompt ${params.id}!`, {
      status: 200,
    });
  } catch (error) {
    console.log("== error ==", error);
    return new Response(
      `Failed to update the prompt ${params.id}. Either the prompt doesn't exist or the system has failed.`,
      { status: 500 }
    );
  }
};

export const DELETE = async (req: Request, { params }: IdynamicIdRoute) => {
  try {
    await connectToDB();

    await Prompt.findByIdAndRemove(params.id);

    return new Response(`Successfully deleted prompt: ${params.id}!`, {
      status: 200,
    });
  } catch (error) {
    console.log("== error ==", error);
    return new Response(
      `Failed to delete the prompt ${params.id}. Either the prompt doesn't exist or the system has failed.`,
      { status: 500 }
    );
  }
};
