import { Body, Controller, HttpException, Post, Request } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Role } from '../../../../shared/enums/role.enum';
import { Roles } from '../../../../shared/decorators/role.decorator';
import { RequestDTO } from '../../../../shared/dto/request.dto';
import { CastDTO } from '../../dto/cast.dto';
import { CreateCastParamsDTO } from '../../dto/createCastParams.dto';
import { CreateCastService } from './createCast.service';
import { ApiCommomDecorators } from '../../../../shared/decorators/globalDoc.decorator';

@Roles(Role.Admin)
@ApiTags('casts')
@Controller()
export class CreateCastController {
  constructor(private createCastService: CreateCastService) {}

  @Post()
  @ApiOkResponse({
    type: CastDTO,
  })
  @ApiCommomDecorators()
  @ApiBadRequestResponse({
    description: 'This will be returned when has validation error',
  })
  public async handle(
    @Request() req: RequestDTO,
    @Body() data: CreateCastParamsDTO,
  ) {
    try {
      return await this.createCastService.execute(req.user.role, data);
    } catch (error) {
      throw new HttpException(
        error.response.message,
        error.response.statusCode,
      );
    }
  }
}
