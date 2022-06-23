import {
  Body,
  Controller,
  HttpException,
  Param,
  Patch,
  Request,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { RequestDTO } from '../../../../shared/dto/request.dto';
import { MovieDTO } from '../../dto/movie.dto';
import { UpdateMovieParamsDTO } from '../../dto/updateMovieParams.dto';
import { UpdateMovieService } from './updateMovie.service';
import { ApiCommomDecorators } from '../../../../shared/decorators/globalDoc.decorator';

@ApiTags('movies')
@Controller()
export class UpdateMovieController {
  constructor(private updateMovieService: UpdateMovieService) {}

  @Patch('/:id')
  @ApiCommomDecorators()
  @ApiOkResponse({
    type: MovieDTO,
  })
  @ApiBadRequestResponse({
    description: 'This will be returned when has validation error',
  })
  public async handle(
    @Request() req: RequestDTO,
    @Param('id') movieId: string,
    @Body() data: UpdateMovieParamsDTO,
  ) {
    try {
      return await this.updateMovieService.execute(
        req.user.role,
        movieId,
        data,
      );
    } catch (error) {
      throw new HttpException(
        error.response.message,
        error.response.statusCode,
      );
    }
  }
}
