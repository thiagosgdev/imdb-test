import {
  Controller,
  Delete,
  HttpException,
  Param,
  Request,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiTags } from '@nestjs/swagger';

import { Role } from '../../../../shared/enums/role.enum';
import { RequestDTO } from '../../../../shared/dto/request.dto';
import { Roles } from '../../../../shared/decorators/role.decorator';
import { DeleteMovieService } from './deleteMovie.service';

@Roles(Role.Admin)
@ApiTags('movies')
@Controller()
export class DeleteMovieController {
  constructor(private deleteMovieService: DeleteMovieService) {}

  @Delete()
  @ApiBadRequestResponse({
    description: 'This will be returned when has validation error',
  })
  public async handle(
    @Request() req: RequestDTO,
    @Param('id') movieId: string,
  ) {
    try {
      return await this.deleteMovieService.execute(req.user.role, movieId);
    } catch (error) {
      throw new HttpException(
        error.response.message,
        error.response.statusCode,
      );
    }
  }
}
