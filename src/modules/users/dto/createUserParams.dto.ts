import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserParamsDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
    example: 'Jon Doe',
  })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    required: true,
    example: 'jon@test.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @ApiProperty({
    required: true,
    example: 'randomPassword',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @ApiProperty({
    required: true,
    example: 'randomPassword',
  })
  passwordConfirmation: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    required: false,
    example: true,
  })
  isAdmin?: boolean;
}
