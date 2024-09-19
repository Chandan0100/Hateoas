import { Controller, Get, HttpStatus, Param, Req, Res } from '@nestjs/common';
import { GetUserHandler } from './get-user.service';
import { GetUserCommand } from './get-user.dto';
import { Response } from 'express';
import { handleError } from 'src/infrastructure/exceptions/custom-exception';

@Controller('users/:uuid')
export class GetUserController {
  constructor(private readonly getUserService: GetUserHandler) {}

  @Get()
  public async handle(
    @Res() res: Response,
    @Param() params: GetUserCommand,
  ) {
    try {
      const response = await this.getUserService.handle(params);
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      console.log('Error during adding personal details', error);
      return handleError(res, error);
    }
  }
}
