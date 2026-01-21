import { env } from '@/config/env';

export const isDev = env.APP_MODE === 'development' || env.APP_MODE === 'local';

export const isEnvLocal = env.APP_MODE === 'local';
