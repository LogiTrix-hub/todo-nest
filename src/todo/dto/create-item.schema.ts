import { z } from 'zod';

export const createItemSchema = z
  .object({
    name: z.string(),
  })
  .required();

export type TCreateItem = z.infer<typeof createItemSchema>;
