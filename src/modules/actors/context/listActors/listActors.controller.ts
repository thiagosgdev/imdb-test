import { Controller, HttpException, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { ActorDTO } from '../../dto/actor.dto';
import { ListActorsService } from './listActors.service';

@ApiTags('actors')
@Controller()
export class ListActorsController {
  constructor(private listActorsService: ListActorsService) {}

  @Post()
  @ApiOkResponse({
    type: ActorDTO,
  })
  @ApiBadRequestResponse({
    description: 'This will be returned when has validation error',
  })
  public async handle() {
    try {
      return await this.listActorsService.execute();
    } catch (error) {
      throw new HttpException(
        error.response.message,
        error.response.statusCode,
      );
    }
  }
}
