import { IsEmail, IsHash, isString } from 'class-validator';

export class CreateUserDto {
  @isString()
  fullname: string;

  @isString()
  username: string;

  @IsHash()
  password: string;

  @IsEmail()
  email: string;
}
