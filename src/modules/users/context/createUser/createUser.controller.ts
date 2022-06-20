import { Body, Controller, HttpException, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiTags,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';

import { CreateUserParamsDTO } from '../../dto/createUserParams.dto';
import { UserDTO } from '../../dto/user.dto';
import { CreateUserService } from './createUser.service';

@ApiTags('users')
@Controller()
export class CreateUserController {
  constructor(private createUserService: CreateUserService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The user object will be returned',
    type: UserDTO,
  })
  @ApiBadRequestResponse({
    description: 'This will be returned when a validation error happens',
  })
  @ApiConflictResponse({
    description: 'E-mail already in use!',
  })
  @ApiTooManyRequestsResponse({
    description:
      'Too many request. Please wait a while before making more requests!',
  })
  public async handle(@Body() data: CreateUserParamsDTO) {
    try {
      return await this.createUserService.execute(data);
    } catch (error) {
      throw new HttpException(
        error.response.message,
        error.response.statusCode,
      );
    }
  }
}
