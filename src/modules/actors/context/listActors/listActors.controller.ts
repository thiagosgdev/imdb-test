import { Controller, Get, HttpException } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Public } from '../../../../shared/decorators/public.decorator';
import { ActorDTO } from '../../dto/actor.dto';
import { ListActorsService } from './listActors.service';

@Public()
@ApiTags('actors')
@Controller()
export class ListActorsController {
  constructor(private listActorsService: ListActorsService) {}

  @Get('/list')
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
