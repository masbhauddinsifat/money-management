import { Global, Module } from '@nestjs/common';
import { UtilsController } from './utils.controller';
import { UitlsService } from './utils.service';

@Global()
@Module({
  controllers: [UtilsController],
  providers: [UitlsService],
})
export class UtilsModule {}
