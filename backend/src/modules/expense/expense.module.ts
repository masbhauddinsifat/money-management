import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseController } from './controller/expense.controller';
import { Expense } from './entity/expense.entity';
import { ExpenseService } from './service/expense.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Expense])],
  controllers: [ExpenseController],
  providers: [ExpenseService],
})
export class ExpenseModule {}
