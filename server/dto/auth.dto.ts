import { IsString, MaxLength, IsEmail, IsStrongPassword } from 'class-validator';

export class AuthDto {
  @IsEmail()
  email: string;

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
}
