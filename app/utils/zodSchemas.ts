import { z } from "zod";

export const blogSchema = z.object({
  email: z
    .string(),
  refCode: z
    .string()
});