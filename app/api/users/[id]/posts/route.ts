import { connectToDB } from "@utils/database";
import Prompt from "@models/Prompt";
import { IdynamicIdRoute } from "@interfaces/interfaces";

export const GET = async (req: Request, { params }: IdynamicIdRoute) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log("== error ==", error);
    return new Response("Failed to fetch the prompts", { status: 500 });
  }
};
