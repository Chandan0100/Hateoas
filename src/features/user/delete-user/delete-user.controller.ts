import { Controller, HttpStatus, Param, Post, Req, Res } from '@nestjs/common';
import { DeleteUserServiceHandler } from './delete-user.service';
import { handleError } from 'src/infrastructure/exceptions/custom-exception';
import { Request, Response } from 'express';
import { DeleteUserCommand } from './delete-user.dto';

@Controller('delete-user/:uuid')
export class DeleteUserController {
  constructor(private readonly deleteUserHandler: DeleteUserServiceHandler) {}

  @Post()
  public async handle(
    @Req() req: Request,
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
