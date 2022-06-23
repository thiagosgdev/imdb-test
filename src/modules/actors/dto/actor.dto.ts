import { ApiProperty } from '@nestjs/swagger';

export class ActorDTO {
  @ApiProperty({
    example: 'b5a43dc2-cb78-4bf0-ba6d-ef69d52527eb',
  })
  id: string;

  @ApiProperty({
    required: true,
    example: 'Elijah Wood',
  })
  name: string;

  @ApiProperty({
    required: true,
    example:
      'Elijah Wood is an American actor best known for portraying Frodo Baggins in Peter Jacksons blockbuster Lord of the Rings film trilogy. ',
  })
  resume: string;

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
