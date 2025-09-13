import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(500),
  category: z.string().min(3).max(50),
  image: z
    .string(),
    // .url()
    //   .refine(async (url) => {
    //     try {
    //       // Follow redirects and check for any image content type
    //       const res = await fetch(url, { method: "HEAD", redirect: "follow" });
    //       const contentType = res.headers.get("content-type");
    //       return contentType && contentType.includes("image/");
    //     } catch {
    //       return false;
    //     }
    //   }),
  pitch: z.string().min(10),
});