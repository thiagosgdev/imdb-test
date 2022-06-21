import { Controller, Get, HttpException, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Public } from '../../../../shared/decorators/public.decorator';
import { ListMoviesQueryParamsDTO } from '../../dto/listMoviesQueryParams.dto';
import { MovieDTO } from '../../dto/movie.dto';
import { ListMoviesService } from './listMovies.service';

@Public()
@ApiTags('movies')
@Controller()
export class ListMoviesController {
  constructor(private listMoviesService: ListMoviesService) {}

  @Get('/list')
  @ApiOkResponse({
    type: MovieDTO,
  })
  @ApiBadRequestResponse({
    description: 'This will be returned when has validation error',
  })
  @ApiNotFoundResponse({
    description: 'No movie found!',
  })
  public async handle(@Query() data: ListMoviesQueryParamsDTO) {
    try {
      return await this.listMoviesService.execute(data);
    } catch (error) {
      throw new HttpException(
        error.response.message,
        error.response.statusCode,
      );
    }
  }
}
