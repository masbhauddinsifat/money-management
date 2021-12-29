import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class ExpenseFilterDto {
  @ApiPropertyOptional({ example: '2021-12-31' })
  @IsDateString()
  date?: Date;
}
