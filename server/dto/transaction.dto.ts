import { IsString, MaxLength, IsNumber, IsInt, IsDateString, IsUUID } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  @MaxLength(20, {
    message: 'description is too long, Maximal length is $constraint1 characters'
  })
  description: string;

  @IsNumber()
  amount: number;

  @IsInt()
  type_id: number;

  @IsString()
  user_id: string;

  @IsDateString()
  createdAt: Date;
}

export class DestroyTransactionDto {
  @IsUUID()
  id: string;
}
