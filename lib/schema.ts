import { z } from "zod";

export const ContactSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  subject: z.string(),
  content: z.string(),
});
