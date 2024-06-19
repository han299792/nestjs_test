import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Transaction, DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/global/entities/user.entities';

@Injectable()
export class UserService {
  constructor(
    private readonly dataSource: DataSource,
  ) {}

  async createUser(email: string, password: string): Promise<void> {
    if(!this.checkDuplication(email)){
      let user = User;
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(password, saltOrRounds);

      await this.dataSource.transaction(async (transactionEntityManager) => {
        await transactionEntityManager.save(User, {
          email: email,
          password: hash,
        });
    })
    }else{
      throw new HttpException('duplicated user', HttpStatus.BAD_REQUEST);
    }
  }
  async checkDuplication(email:string): Promise<User> {
    const user = await this.dataSource.transaction(async (transactionEntityManager) => {
      return await transactionEntityManager.findOne(User, {
        where : {email: email},
      });
    })
    return user;
  }
}