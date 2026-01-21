import * as z from 'zod';

export const EnvSchema = z.object({
  // API_URL: z.string(),
  // ENABLE_API_MOCKING: z
  //   .string()
  //   .refine((s) => s === 'true' || s === 'false')
  //   .transform((s) => s === 'true')
  //   .optional(),
  // APP_URL: z.string().optional().default('http://localhost:3000'),
  // APP_MOCK_API_PORT: z.string().optional().default('8080'),

  //#region APP
  APP_MODE: z.string(),
  APP_TITLE: z.string(),
  //#endregion

  //#region Common
  SUPPORT_HOTLINE: z.string(),
  MINIMUM_CHROME_VERSION: z.string(),
  //#endregion

  //#region Business
  APP_CODE: z.string(),
  //#endregion

  //#region API_URL
  API_URL_BASE: z.string(),
  API_URL_SSO: z.string(),
  API_URL_QTUD: z.string(),
  API_URL_NOTIFICATION: z.string(),
  API_URL_DANH_MUC: z.string(),
  API_URL_EDITOR: z.string(),
  API_URL_NVCB_HO_SO: z.string(),
  API_URL_DTHS: z.string(),
  API_URL_SIGNATURE: z.string(),
  //#endregion

  //#region FILE_URL
  FILE_URL_MPSSIGN: z.string(),
  FILE_URL_CHROME: z.string()
  //#endregion
});
