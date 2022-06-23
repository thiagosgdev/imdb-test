import { Body, Controller, HttpException, Post, Request } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { RequestDTO } from '../../../../shared/dto/request.dto';
import { CreateMovieParamsDTO } from '../../dto/createMovieParams.dto';
import { MovieDTO } from '../../dto/movie.dto';
import { CreateMovieService } from './createMovie.service';
import { Role } from '../../../../shared/enums/role.enum';
import { Roles } from '../../../../shared/decorators/role.decorator';
import { ApiCommomDecorators } from '../../../../shared/decorators/globalDoc.decorator';

@Roles(Role.Admin)
@ApiTags('movies')
@Controller()
export class CreateMovieController {
  constructor(private createMovieService: CreateMovieService) {}

  @Post()
  @ApiCommomDecorators()
  @ApiOkResponse({
    type: MovieDTO,
  })
  @ApiBadRequestResponse({
    description: 'This will be returned when has validation error',
  })
  public async handle(
    @Request() req: RequestDTO,
    @Body() data: CreateMovieParamsDTO,
  ) {
    try {
      return await this.createMovieService.execute(req.user.role, data);
    } catch (error) {
      throw new HttpException(
        error.response.message,
        error.response.statusCode,
      );
    }
  }
}
