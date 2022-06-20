import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserParamsDTO {
  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    example: 'Jon Doe',
  })
  name?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({
    required: false,
    example: 'jon@test.com',
  })
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @ApiProperty({
    required: false,
    example: 'randomPassword',
  })
  password?: string;
}
