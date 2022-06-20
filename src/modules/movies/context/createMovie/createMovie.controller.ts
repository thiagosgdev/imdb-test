import { Body, Controller, HttpException, Post, Request } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { RequestDTO } from '../../../../shared/dto/request.dto';
import { CreateMovieParamsDTO } from '../../dto/createMovieParams.dto';
import { MovieDTO } from '../../dto/movie.dto';
import { CreateMovieService } from './createMovie.service';

@ApiTags('movies')
@Controller()
export class CreateMovieController {
  constructor(private createMovieService: CreateMovieService) {}

  @Post()
  @ApiOkResponse({
    type: MovieDTO,
  })
  @ApiBadRequestResponse({
    description: 'This will be returned when has validation error',
  })
  @ApiNotFoundResponse({
    description: 'No user found!',
  })
  @ApiConflictResponse({
    description: "Email can't be changed, it's already in use!",
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
