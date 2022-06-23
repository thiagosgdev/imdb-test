import { ApiProperty } from '@nestjs/swagger';

export class VoteDTO {
  @ApiProperty({
    example: 'b5a43dc2-cb78-4bf0-ba6d-ef69d52527eb',
  })
  id: string;

  @ApiProperty({
    example: '020d985f-dbd0-42b6-ab2f-d01eede1c08d',
  })
  userId: string;

  @ApiProperty({
    example: '77b88df9-b0b8-472c-886f-86349ab40f2e',
  })
  movieId: string;

  @ApiProperty({
    example: 4,
  })
  score: number;

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
