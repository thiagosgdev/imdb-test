import { Body, Controller, HttpException, Post, Request } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiTags,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';

import { Roles } from '../../../../shared/decorators/role.decorator';
import { RequestDTO } from '../../../../shared/dto/request.dto';
import { Role } from '../../../../shared/enums/role.enum';
import { CreateUserParamsDTO } from '../../dto/createUserParams.dto';
import { UserDTO } from '../../dto/user.dto';
import { CreateAdminService } from './createAdmin.service';
import { ApiCommomDecorators } from '../../../../shared/decorators/globalDoc.decorator';

@Roles(Role.Admin)
@ApiTags('users')
@Controller('/admin')
export class CreateAdminController {
  constructor(private createAdminService: CreateAdminService) {}

  @Post()
  @ApiCommomDecorators()
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
  public async handle(
    @Request() req: RequestDTO,
    @Body() data: CreateUserParamsDTO,
  ) {
    try {
      return await this.createAdminService.execute(req.user.role, data);
    } catch (error) {
      throw new HttpException(
        error.response.message,
        error.response.statusCode,
      );
    }
  }
}
