import { ExpenseDto } from './../dto/expence.dto';
import { responceData } from './../../../utils/responce-data.util';
import { Expense } from '../entity/expense.entity';
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/modules/user/entity/user.entity';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>,
  ) {}

  async getAll(user: User) {
    try {
      const [expence, count] = await this.expenseRepository.findAndCount({
        where: { user },
      });
      const data = { expence, total: count };

      return responceData('Get Data Success', HttpStatus.OK, data);
    } catch (error) {
      throw error;
    }
  }

  async getById(user: User, id: string) {
    try {
      const data = await this.expenseRepository.findOne({
        where: { user, id },
      });

      if (!data) {
        return new NotFoundException('Expense or Income Not Found');
      }

      return responceData('Get Data Success', HttpStatus.OK, data);
    } catch (error) {
      throw error;
    }
  }

  async create(user: User, expense: ExpenseDto) {
    try {
      const createExpense = this.expenseRepository.create({
        ...expense,
        user,
      });
      const expenseRes = await createExpense.save();

      return responceData('Create Success', HttpStatus.OK, expenseRes);
    } catch (error) {
      throw error;
    }
  }

  async update(user: User, id: string, expense: Partial<ExpenseDto>) {
    try {
      const res = await this.expenseRepository.update(
        { id, user },
        { ...expense },
      );

      if (res.affected) {
        const expenseRes = await this.expenseRepository.findOne({
          where: { id },
        });
        return responceData('Update Success', HttpStatus.OK, expenseRes);
      }
      return new NotFoundException('No Expense or Income found');
    } catch (error) {
      throw error;
    }
  }

  async delete(user: User, id: string) {
    try {
      const delRes = await this.expenseRepository.softDelete({ user, id });
      if (delRes.affected) {
        return responceData('Delete Success', HttpStatus.OK);
      }
      return new NotFoundException('No Expense or Income Found');
    } catch (error) {
      throw error;
    }
  }
}
