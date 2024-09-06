import {
  Controller,
  Get,
  HttpStatus,
  Query,
  Req,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { GetUserServiceHandler } from './get-user.service';
import { GetUserCommand } from './get-user.dto';
import { Request, Response } from 'express';
import { handleError } from 'src/infrastructure/exceptions/custom-exception';

@Controller('get-user')
export class GetUserController {
  constructor(private readonly getUserService: GetUserServiceHandler) {}

  @Get()
  public async handle(
    @Req() req: Request,
    @Res() res: Response,
    @Query(new ValidationPipe({ transform: true })) query: GetUserCommand,
  ) {
    try {
      const response = await this.getUserService.handle(query);
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
