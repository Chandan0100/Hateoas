import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AddUserHandler } from './add-user.service';
import { Response } from 'express';
import { AddUserCommand } from './add-user.dto';
import { handleError } from 'src/infrastructure/exceptions/custom-exception';

@Controller('users')
export class AddUserController {
  constructor(private readonly addUserHandler: AddUserHandler) {}
  @Post()
  public async handle(@Res() res: Response, @Body() body: AddUserCommand) {
    try {
      const response = await this.addUserHandler.handle(body);
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      console.log('Error during adding personal details', error);
      return handleError(res, error);
    }
  }
}
