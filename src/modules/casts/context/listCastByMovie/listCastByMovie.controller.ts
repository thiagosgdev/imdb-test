import { Controller, Get, HttpException, Param, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Public } from '../../../../shared/decorators/public.decorator';
import { CastDTO } from '../../dto/cast.dto';
import { ListCastByMovieService } from './listCastByMovie.service';

@Public()
@ApiTags('casts')
@Controller('/list/:movieId')
export class ListCastByMovieController {
  constructor(private listCastByMovieService: ListCastByMovieService) {}

  @Get()
  @ApiOkResponse({
    type: CastDTO,
  })
  @ApiBadRequestResponse({
    description: 'This will be returned when has validation error',
  })
  public async handle(@Param('movieId') movieId: string) {
    try {
      return await this.listCastByMovieService.execute(movieId);
    } catch (error) {
      throw new HttpException(
        error.response.message,
        error.response.statusCode,
      );
    }
  }
}
