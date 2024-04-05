import type { ImagesResults } from "@/models/Images";
import { ImagesSchemaWithPhotos } from "@/models/Images";
import env from "./env";

export default async function fetchImages(url: string): Promise<ImagesResults | undefined> {
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: env.PEXELS_API_KEY,
      },
    });
    if (!res.ok) throw new Error("Fetch Images error!\n");

    const ImagesResults: ImagesResults = await res.json();

    //Parse data with Zod schema
    const parsedData = ImagesSchemaWithPhotos.parse(ImagesResults);

    return parsedData;

    if (parsedData.total_results === 0) return undefined;
  } catch (e) {
    if (e instanceof Error) console.log(e.stack);
  }
}
