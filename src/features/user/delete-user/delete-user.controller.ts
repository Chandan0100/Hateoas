import { Controller, HttpStatus, Post, Query, Req, Res } from '@nestjs/common';
import { DeleteUserService } from './delete-user.service';
import { handleError } from 'src/infrastructure/exceptions/custom-exception';
import { Request, Response } from 'express';
import { DeleteUserCommand } from './delete-user.dto';

@Controller('delete-user')
export class DeleteUserController {
  constructor(private readonly deleteUserService: DeleteUserService) {}

  @Post() 
  public async handle(
    @Req() req: Request, 
    @Res() res :Response,
    @Query() query : DeleteUserCommand
  ) {
    try {
      const response = await this
      return res.status(HttpStatus.OK).json(response);
    }
    catch(error) {
      console.log('Error during adding personal details', error);
      return handleError(res, error);
    }

  }
}
