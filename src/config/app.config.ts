import { registerAs } from '@nestjs/config';
export default registerAs('app', () => ({
    port: parseInt(process.env.PORT ?? '3000', 10),
    useFakeApi: (process.env.USE_FAKE_API ?? 'true') === 'true',
    databaseUrl: process.env.DATABASE_URL ?? '',
}));
