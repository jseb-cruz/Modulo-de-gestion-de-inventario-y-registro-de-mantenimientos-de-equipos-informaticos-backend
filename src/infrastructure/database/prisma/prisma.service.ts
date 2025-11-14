import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../../../prisma/generated/prisma/client';
type ExtendedPrismaClient = PrismaClient & {
    $on(event: 'beforeExit', callback: () => void): void;
};
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }
    async enableShutdownHooks(app: INestApplication) {
        (this as ExtendedPrismaClient).$on('beforeExit', async () => await
            app.close());
    }
}
