import { Body, Controller, HttpStatus, Param, Patch, Res } from '@nestjs/common';
import { UpdateParamCommand, UpdatePayloadCommand } from './update-user.dto';
import { handleError } from 'src/infrastructure/exceptions/custom-exception';
import { Response } from 'express';
import { UpdateUserHandler } from './update-user.service';
@Controller('users/:uuid')
export class UpdateUserController {
  constructor(
    private readonly updateUserService: UpdateUserHandler
  ) {}

  @Patch()
  public async handle(
    @Res() res: Response,
    @Body() body: UpdatePayloadCommand,
    @Param() params: UpdateParamCommand,
  ) {
    try {
      const response = await this.updateUserService.handle(params,body);
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      console.log('Error during adding personal details', error);
      return handleError(res, error);
    }
  }
}
