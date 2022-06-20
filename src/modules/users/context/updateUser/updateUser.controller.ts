import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Patch,
  Request,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RequestDTO } from '../../../../shared/dto/request.dto';
import { UpdateUserParamsDTO } from '../../dto/updateUserParams.dto';
import { UserDTO } from '../../dto/user.dto';
import { UpdateUserService } from './updateUser.service';

@ApiTags('users')
@Controller('/users')
export class UpdateUserController {
  constructor(private updateUserService: UpdateUserService) {}
  @Patch()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: UserDTO,
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
    @Body() data: UpdateUserParamsDTO,
    @Request() req: RequestDTO,
  ) {
    try {
      return await this.updateUserService.execute(data, req.user.userId);
    } catch (error) {
      throw new HttpException(
        error.response.message,
        error.response.statusCode,
      );
    }
  }
}
