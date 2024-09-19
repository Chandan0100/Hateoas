import { Controller, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { DeleteUserHandler } from './delete-user.service';
import { handleError } from 'src/infrastructure/exceptions/custom-exception';
import { Response } from 'express';
import { DeleteUserCommand } from './delete-user.dto';

@Controller('users/:uuid')
export class DeleteUserController {
  constructor(private readonly deleteUserHandler: DeleteUserHandler) {}

  @Post()
  public async handle(
    @Res() res: Response,
    @Param() params: DeleteUserCommand,
  ) {
    try {
      const { uuid } = params;
      const response = await this.deleteUserHandler.handle(uuid);
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      console.log('Error deleting details', error);
      return handleError(res, error);
    }
  }
}
