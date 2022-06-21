import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsUUID, Max, Min } from 'class-validator';

export class CreateVoteParamsDTO {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    required: true,
    example: 'b5a43dc2-cb78-4bf0-ba6d-ef69d52527eb',
  })
  movieId: string;

  @IsNotEmpty()
  @IsInt()
  @Max(4)
  @Min(0)
  @ApiProperty({
    required: true,
    example: 4,
  })
  score: number;
}
