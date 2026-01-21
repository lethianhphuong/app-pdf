import { z } from 'zod';

export const QueryOptions_Schema = z
  .object({
    enabled: z.boolean().optional(),
    keepPreviousData: z.boolean().optional()
  })
  .catchall(z.any());
