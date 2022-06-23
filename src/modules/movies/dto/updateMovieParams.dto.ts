import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { MovieGenre } from '../../../shared/enums/movieGenre.enum';

export class UpdateMovieParamsDTO {
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
    example:
      'The two towers between Mordor and Isengard, Barad-dûr and Orthanc, have united in their lust for destruction. The corrupt wizard Saruman, under the power of the Dark Lord Sauron, and his slimy assistant, Gríma Wormtongue, have created a grand Uruk-hai army bent on the destruction of Man and Middle-earth.',
  })
  description?: string;

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
}
