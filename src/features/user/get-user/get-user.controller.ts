import { Controller, Get, HttpStatus, Param, Req, Res } from '@nestjs/common';
import { GetUserServiceHandler } from './get-user.service';
import { GetUserCommand } from './get-user.dto';
import { Request, Response } from 'express';
import { handleError } from 'src/infrastructure/exceptions/custom-exception';

@Controller('get-user/:uuid')
export class GetUserController {
  constructor(private readonly getUserService: GetUserServiceHandler) {}

  @Get()
  public async handle(
    @Req() req: Request,
    @Res() res: Response,
    @Param() params: GetUserCommand,
  ) {
    try {
      const { uuid } = params;
      console.log(uuid);
      const response = await this.getUserService.handle(uuid);
      if (!response) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'No user found' });
      }
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      console.log('Error during adding personal details', error);
      return handleError(res, error);
    }
  }
}
