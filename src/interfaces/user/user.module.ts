import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserController } from './user.controller';
import { UserService } from '../../application/user/user.service';
import { UserPrismaRepository } from '../../infrastructure/user/user.prisma.repository';
import { PrismaModule } from '../../infrastructure/database/prisma/prisma.module';

const userRepoProvider = { provide: 'UserRepository', useClass: UserPrismaRepository };

@Module({
  imports: [
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    userRepoProvider,
  ],
  exports: [UserService, userRepoProvider, PassportModule],
})
export class UserModule {}
