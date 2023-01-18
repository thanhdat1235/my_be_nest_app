import { UserService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private UserService: UserService, private jwtService: JwtService ) {}

  async validateUser(email: string, password: string): Promise<User> {
    
    const user = await this.UserService.findOne(email);    
    
    if(user) {
      const passwordMatch = bcrypt.compare(password, user.password);
      if(passwordMatch) {
        user.password = undefined;
        return user;
      }
    } 

    return null;
  }

  async login(user: User): Promise<any> {
    const  dataSign = {email: user.email, sub: user.id};
    return {
      access_token: this.jwtService.sign(dataSign),
    }
  }
}
