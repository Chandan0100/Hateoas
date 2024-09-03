import { Body, Controller, Get, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { AddUserServiceHandler } from './add-user.service';
import { Response } from 'express';
import { AddUserCommand } from './add-user.dto';
import { handleError } from 'src/infrastructure/exceptions/custom-exception';

@Controller('add-user')
export class AddUserController {
  constructor(
    private readonly addUserService: AddUserServiceHandler
  ) {}

  @Post() 
  public async handle(
    @Req() req: Request, 
    @Res() res :Response,
    @Body() body : AddUserCommand
  ) {
    try {
      const response = await this.addUserService.handle(body);
      return res.status(HttpStatus.OK).json(response);
    }
    catch(error) {
      console.log('Error during adding personal details', error);
      return handleError(res, error);
    }

  }
}
