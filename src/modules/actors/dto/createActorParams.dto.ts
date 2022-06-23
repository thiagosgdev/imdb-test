import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateActorParamsDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
    example: 'Elijah Wood',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
    example:
      'Elijah Wood is an American actor best known for portraying Frodo Baggins in Peter Jacksons blockbuster Lord of the Rings film trilogy. ',
  })
  resume: string;
}
