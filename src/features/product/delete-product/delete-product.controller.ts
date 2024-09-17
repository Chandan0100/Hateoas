import {
  Controller,
  Delete,
  HttpStatus,
  Param,
  Req,
  Res,
} from '@nestjs/common';
import { handleError } from 'src/infrastructure/exceptions/custom-exception';
import { Request, Response } from 'express';
import { DeleteProductServiceHandler } from './delete-product.service';
import { DeleteProductCommand } from './delete-product.dto';

@Controller('delete-product/:uuid')
export class DeleteProductController {
  constructor(
    private readonly deleteProductService: DeleteProductServiceHandler,
  ) {}

  @Delete()
  public async handle(
    @Req() req: Request,
    @Res() res: Response,
    @Param() params: DeleteProductCommand,
  ) {
    try {
      const { uuid } = params;
      const response = await this.deleteProductService.handle(uuid);
      if (response?.affected) {
        return res.status(HttpStatus.OK).json(response);
      }
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'No product found' });
    } catch (error) {
      console.log('Error during deleting product details', error);
      return handleError(res, error);
    }
  }
}
