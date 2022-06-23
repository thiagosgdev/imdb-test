import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { MovieGenre } from '../../../shared/enums/movieGenre.enum';

export class ListMoviesQueryParamsDTO {
  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    example: 'Lord of the Rings: The Two Towers',
  })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    example: 'Peter Jackson',
  })
  director?: string;

  @IsOptional()
  @IsEnum(MovieGenre)
  @ApiProperty({
    required: false,
    enum: MovieGenre,
    example: 'ACTION',
  })
  genre?: MovieGenre;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    example: 'John',
  })
  actor?: string;
}
