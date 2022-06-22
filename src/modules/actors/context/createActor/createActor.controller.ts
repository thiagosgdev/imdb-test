import { Body, Controller, HttpException, Post, Request } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Role } from '../../../../shared/enums/role.enum';
import { Roles } from '../../../../shared/decorators/role.decorator';
import { RequestDTO } from '../../../../shared/dto/request.dto';
import { ActorDTO } from '../../dto/actor.dto';
import { CreateActorParamsDTO } from '../../dto/createActorParams.dto';
import { CreateActorService } from './createActor.service';

@Roles(Role.Admin)
@ApiTags('actors')
@Controller()
export class CreateActorController {
  constructor(private createActorService: CreateActorService) {}

  @Post()
  @ApiOkResponse({
    type: ActorDTO,
  })
  @ApiBadRequestResponse({
    description: 'This will be returned when has validation error',
  })
  public async handle(
    @Request() req: RequestDTO,
    @Body() data: CreateActorParamsDTO,
  ) {
    try {
      return await this.createActorService.execute(req.user.role, data);
    } catch (error) {
      throw new HttpException(
        error.response.message,
        error.response.statusCode,
      );
    }
  }
}
