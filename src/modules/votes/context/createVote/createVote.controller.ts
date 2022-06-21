import { Body, Controller, HttpException, Post, Request } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { RequestDTO } from '../../../../shared/dto/request.dto';
import { CreateVoteParamsDTO } from '../../dto/createVoteParams.dto';
import { VoteDTO } from '../../dto/vote.dto';
import { CreateVoteService } from './createVote.service';

@ApiTags('votes')
@Controller()
export class CreateVoteController {
  constructor(private createVoteService: CreateVoteService) {}

  @Post()
  @ApiOkResponse({
    type: VoteDTO,
  })
  @ApiBadRequestResponse({
    description: 'This will be returned when has validation error',
  })
  @ApiConflictResponse({
    description: 'User already voted for this movie!',
  })
  public async handle(
    @Request() req: RequestDTO,
    @Body() data: CreateVoteParamsDTO,
  ) {
    try {
      return await this.createVoteService.execute(req.user.userId, data);
    } catch (error) {
      throw new HttpException(
        error.response.message,
        error.response.statusCode,
      );
    }
  }
}
