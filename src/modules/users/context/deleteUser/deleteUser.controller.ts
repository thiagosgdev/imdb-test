import {
  Controller,
  Delete,
  HttpCode,
  HttpException,
  HttpStatus,
  Request,
} from '@nestjs/common';
import { ApiNoContentResponse, ApiTags } from '@nestjs/swagger';

import { RequestDTO } from '../../../../shared/dto/request.dto';
import { DeleteUserService } from './deleteUser.service';
import { ApiCommomDecorators } from '../../../../shared/decorators/globalDoc.decorator';

@ApiTags('users')
@Controller()
export class DeleteUserController {
  constructor(private deleteUserService: DeleteUserService) {}

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiCommomDecorators()
  @ApiNoContentResponse({
    description: 'User deleted.',
  })
  public async handle(@Request() req: RequestDTO) {
    try {
      await this.deleteUserService.execute(req.user.userId);
    } catch (error) {
      throw new HttpException(
        error.response.message,
        error.response.statusCode,
      );
    }
  }
}
