import * as z from "zod";

export const contactSchema = z.object({
  subject: z.string(),
  content: z.string(),
});
export type ContactSchemaType = z.infer<typeof contactSchema>;
