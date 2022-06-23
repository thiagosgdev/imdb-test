import { ApiProperty } from '@nestjs/swagger';

import { CastDTO } from '../../../modules/casts/dto/cast.dto';
import { VoteDTO } from '../../../modules/votes/dto/vote.dto';
import { Cast } from '../../../shared/entities/cast.entity';
import { Vote } from '../../../shared/entities/vote.entity';
import { MovieGenre } from '../../../shared/enums/movieGenre.enum';

export class MovieDTO {
  @ApiProperty({
    example: 'b5a43dc2-cb78-4bf0-ba6d-ef69d52527eb',
  })
  id: string;

  @ApiProperty({
    required: true,
    example: 'Lord of the Rings: The Two Towers',
  })
  name: string;

  @ApiProperty({
    required: true,
    example:
      'The two towers between Mordor and Isengard, Barad-dûr and Orthanc, have united in their lust for destruction. The corrupt wizard Saruman, under the power of the Dark Lord Sauron, and his slimy assistant, Gríma Wormtongue, have created a grand Uruk-hai army bent on the destruction of Man and Middle-earth.',
  })
  description: string;

  @ApiProperty({
    required: true,
    example: 'Peter Jackson',
  })
  director: string;

  @ApiProperty({
    required: true,
    enum: MovieGenre,
    example: 'action',
  })
  genre: string;

  @ApiProperty({
    type: VoteDTO,
  })
  votes?: Vote[];

  @ApiProperty({
    type: CastDTO,
  })
  casts?: Cast[];
  @ApiProperty({
    example: 10,
  })
  votesCount?: number;

  @ApiProperty({
    example: 2,
  })
  voteAverage?: number;

  @ApiProperty({
    example: new Date(),
  })
  createdAt: Date;

  @ApiProperty({
    example: null,
  })
  updatedAt: Date;

  @ApiProperty({
    example: null,
  })
  deletedAt: Date;
}
