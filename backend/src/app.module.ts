import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/guard/jwt.gurad';
import { ExpenseModule } from './modules/expense/expense.module';
import { UtilsModule } from './modules/uitls/utils.module';
import { UserModule } from './modules/user/user.module';

const environment = process.env.NODE_ENV || 'development';
const envFilePath = [`${environment}.env`];
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities:
        process.env.POSTGRES_AUTO_LOAD_ENTITIES === 'true' ? true : false,
      synchronize: process.env.POSTGRES_SYNCHRONIZE === 'true' ? true : false,
      logging: process.env.POSTGRES_LOGGING === 'true' ? true : false,
    }),
    ExpenseModule,
    AuthModule,
    UserModule,
    UtilsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
