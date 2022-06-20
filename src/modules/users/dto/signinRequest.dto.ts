import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SigninRequestDTO {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'test@test.com',
    required: true,
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @ApiProperty({
    required: true,
    minLength: 6,
    maxLength: 20,
    example: 'a2B4T#0',
  })
  password: string;
}
