import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly DataSource: DataSource,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  async login(email: string, password: string): Promise<any>{
    const userInfo = await this.userService.checkDuplication(email);
    if(userInfo){
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(password, saltOrRounds)
      const correctPassword = await bcrypt.compare(password, hash);
      if(correctPassword){
        const jwtToken = await this.getJwtAccessToken(userInfo.user_id, userInfo.email);
        return {
          accessToken: jwtToken,
        }
      }else{
        throw new HttpException('wrong password',HttpStatus.BAD_REQUEST);
      }
    }else{
      throw new HttpException('Invalid email', HttpStatus.BAD_REQUEST);
    }
  }
  async getJwtAccessToken(id: number, email:string): Promise<string>{
    const payload ={ id: id, email:email };
    const jwtAccessTokenSecret = this.configService.get(
      'JWT_ACCESS_TOKEN_SECRET',
    );
    const JwtAccessTokenExpire= this.configService.get(
      'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
    );
    return this.jwtService.sign(payload,{
      secret : jwtAccessTokenSecret,
      expiresIn : JwtAccessTokenExpire,
    });
  }
}
