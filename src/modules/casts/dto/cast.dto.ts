import { ApiProperty } from '@nestjs/swagger';

export class CastDTO {
  @ApiProperty({
    example: 'b5a43dc2-cb78-4bf0-ba6d-ef69d52527eb',
  })
  id: string;

  @ApiProperty({
    required: true,
    example: 'b2fbb7d4-fd1b-46a3-a6c9-1461cea8b65d',
  })
  actorId: string;

  @ApiProperty({
    required: true,
    example: '903d41b5-4e1f-4f0d-bece-0547cb0ea9d3',
  })
  movieId: string;

  @ApiProperty({
    required: true,
    example: 'Gandalf',
  })
  role: string;

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
