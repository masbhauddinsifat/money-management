import { compare } from 'bcrypt';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { Expense } from './../../expense/entity/expense.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true, type: 'date' })
  dob: Date;

  @Column({ nullable: true })
  otp: number;

  @OneToMany(() => Expense, (expense) => expense.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  expense: Expense[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @VersionColumn()
  version: number;

  async comparePassword(password: string): Promise<boolean> {
    return await compare(password, this.password);
  }
}
