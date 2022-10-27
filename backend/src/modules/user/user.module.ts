import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entity/user.entity';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';

@Global()
@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UserModule {}
