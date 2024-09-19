import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { handleError } from 'src/infrastructure/exceptions/custom-exception';
import { GetAllUsersHandler } from './get-all-users.service';
import { GetAllUsersQuery } from './get-al-users.interface';
import { GetUsersQuery } from './get-all-users.dto';

@Controller('users')
export class GetAllUsersController {
  constructor(private readonly getAllUsersHandler: GetAllUsersHandler) {}

  @Get()
  public async handle(
    @Res() res: Response,
    @Query() query: GetUsersQuery
  ) {
    try {
      const response = await this.getAllUsersHandler.handle(query);
      console.log(response)
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      console.log('Error during fetching all users', error);
      return handleError(res, error);
    }
  }
}
