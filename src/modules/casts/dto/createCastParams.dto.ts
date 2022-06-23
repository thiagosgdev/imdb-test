import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateCastParamsDTO {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    required: true,
    example: '903d41b5-4e1f-4f0d-bece-0547cb0ea9d3',
  })
  actorId: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    required: true,
    example: 'b3efd39e-c016-4ad1-8ed7-9997da83defb',
  })
  movieId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
    example: 'Gandalf',
  })
  role: string;
}
