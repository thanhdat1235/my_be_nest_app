import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './../auth/strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from './../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY_ACCESS_TOKEN,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [UsersController],
  providers: [UserService, JwtStrategy],
})
export class UsersModule {}
