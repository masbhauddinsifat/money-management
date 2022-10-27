import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { jwtConstants } from './constants/jwt.constant';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';

@Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
    TypeOrmModule.forFeature([User]),
    // UserModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [PassportModule, JwtStrategy],
})
export class AuthModule {}
