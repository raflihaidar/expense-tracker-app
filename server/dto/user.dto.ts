import { IsEmail, IsString, MaxLength, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsString()
  fullname: string;

  @IsString()
  @IsStrongPassword(
    {
      minLength: 3,
      minNumbers: 1,
      minUppercase: 1
    },
    {
      message: 'minimal $property is $constraint1 characters'
    }
  )
  @MaxLength(15, {
    message: 'username is too long, Minimal length is $constraint1 characters'
  })
  username: string;

  @IsString()
  @IsStrongPassword(
    {
      minLength: 8,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1
    },
    {
      message: 'minimal $property is $constraint1 characters'
    }
  )
  @MaxLength(20, {
    message: 'password is too long, Minimal length is $constraint1 characters'
  })
  password: string;

  @IsEmail()
  email: string;
}
