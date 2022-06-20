import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsDate } from 'class-validator';

export class UserDTO {
  @ApiProperty({
    example: '',
  })
  id: string;

  @ApiProperty({
    example: 'Jon Doe',
  })
  name: string;

  @ApiProperty({
    example: 'jon@test.com',
  })
  email: string;

  @ApiProperty({
    example: false,
  })
  isAdmin: boolean;

  @Exclude()
  password: string;

  @IsDate()
  @ApiProperty({
    example: new Date(),
  })
  createdAt: Date;

  @IsDate()
  @ApiProperty({
    example: null,
  })
  updatedAt: Date;

  @IsDate()
  @ApiProperty({
    example: null,
  })
  deletedAt: Date;
}
