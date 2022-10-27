import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChangePasswordDTO } from 'src/modules/auth/dto/changePassword.dto';
import { hashedPassword } from 'src/utils/bcript.util';
import { responceData as responseData } from 'src/utils/responce-data.util';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { UpdateUserDto } from './../dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAll() {
    try {
      const [users, count] = await this.userRepository.findAndCount({});
      const data = { users, total: count };

      return responseData('Get User Success', HttpStatus.OK, data);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getById(id: string) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });

      if (!user) {
        return new NotFoundException('User Not Found');
      }

      return responseData('Get User Success', HttpStatus.OK, user);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async update(id: string, user: UpdateUserDto) {
    try {
      const updateRes = await this.userRepository.update(id, user);

      if (updateRes.affected) {
        const findUser = await this.userRepository.findOne({ where: { id } });
        return responseData('Update User Success', HttpStatus.OK, findUser);
      } else {
        return new BadRequestException('Update User Failed');
      }
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async delete(id: string) {
    try {
      const res = await this.userRepository.delete(id);

      if (res.affected) {
        return responseData('Delete User Success', HttpStatus.OK, res);
      } else {
        return new BadRequestException('Delete User Failed');
      }
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async changePassword(userCredential: Partial<ChangePasswordDTO>, user: User) {
    try {
      if (userCredential.password === userCredential.newPassword) {
        return new BadRequestException(
          "New Password can't be the same as old Password",
        );
      }

      const userRes = await this.userRepository.findOne({
        where: { email: user.email },
        select: ['id', 'password'],
      });

      if (!userRes) {
        return new BadRequestException('Invalid Email or Password');
      }

      const isPasswordCorrect = await userRes.comparePassword(
        userCredential.password,
      );

      if (!isPasswordCorrect) {
        return new BadRequestException('Invalid Email or Password');
      }

      const newHashedPassword = await hashedPassword(
        userCredential.newPassword,
      );

      const updateRes = await this.userRepository.update(userRes.id, {
        password: newHashedPassword,
      });

      if (updateRes.affected) {
        const data = await this.userRepository.findOne({
          where: { email: user.email },
        });

        return responseData('Password Update Success', HttpStatus.OK, data);
      } else {
        return new BadRequestException();
      }
    } catch (error) {
      throw new InternalServerErrorException('Internal Server Error');
    }
  }
}
