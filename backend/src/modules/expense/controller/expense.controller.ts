import { ExpenseDto } from './../dto/expence.dto';
import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  Put,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { ExpenseService } from '../service/expense.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/modules/auth/decorator/user.decorator';
import { User } from 'src/modules/user/entity/user.entity';

@ApiTags('Expense')
@ApiBearerAuth()
@Controller('expense')
export class ExpenseController {
  constructor(private expenseService: ExpenseService) {}

  @Get()
  getAll(@GetUser() user: User) {
    try {
      return this.expenseService.getAll(user);
    } catch (error) {
      return error;
    }
  }

  @Get(':id')
  getById(@GetUser() user: User, @Param('id') id: string) {
    try {
      return this.expenseService.getById(user, id);
    } catch (error) {
      return error;
    }
  }

  @Post()
  create(@GetUser() user: User, @Body(ValidationPipe) expense: ExpenseDto) {
    try {
      return this.expenseService.create(user, expense);
    } catch (error) {
      return error;
    }
  }

  @Put(':id')
  @ApiBody({ type: ExpenseDto })
  update(
    @GetUser() user: User,
    @Param('id') id: string,
    @Body() expense: Partial<ExpenseDto>,
  ) {
    try {
      return this.expenseService.update(user, id, expense);
    } catch (error) {
      return error;
    }
  }

  @Delete(':id')
  delete(@GetUser() user: User, @Param('id') id: string) {
    try {
      return this.expenseService.delete(user, id);
    } catch (error) {
      return error;
    }
  }
}
