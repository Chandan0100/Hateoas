import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Response } from 'express';

import { handleError } from 'src/infrastructure/exceptions/custom-exception';
import { AddProductHandler } from './add-product.service';
import { AddProductCommand } from './add-product.dto';

@Controller('add-product')
export class AddProductController {
  constructor(private readonly addProductService: AddProductHandler) {}

  @Post()
  public async handle(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: AddProductCommand,
  ) {
    try {
      const response = await this.addProductService.handle(body);
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      console.log('Error during adding product details', error);
      return handleError(res, error);
    }
  }
}
