import {
  Controller,
  Get,
  HttpStatus,
  Query,
  Req,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { handleError } from 'src/infrastructure/exceptions/custom-exception';
import { GetProductCommand } from './get-product.dto';
import { GetProductHandler } from './get-product.service';

@Controller('get-product')
export class GetProductController {
  constructor(private readonly getProductService: GetProductHandler) {}

  @Get()
  public async handle(
    @Req() req: Request,
    @Res() res: Response,
    @Query(new ValidationPipe({ transform: true })) query: GetProductCommand,
  ) {
    try {
      const response = await this.getProductService.handle(query);
      if (!response) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'No product found' });
      }
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      console.log('Error during adding personal details', error);
      return handleError(res, error);
    }
  }
}
