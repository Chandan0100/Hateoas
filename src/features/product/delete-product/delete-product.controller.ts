import { Controller, HttpStatus, Post, Query, Req, Res } from '@nestjs/common';
import { handleError } from 'src/infrastructure/exceptions/custom-exception';
import { Request, Response } from 'express';
import { DeleteProductServiceHandler } from './delete-product.service';
import { DeleteProductCommand } from './delete-product.dto';

@Controller('delete-product')
export class DeleteProductController {
  constructor(
    private readonly deleteProductService: DeleteProductServiceHandler,
  ) {}

  @Post()
  public async handle(
    @Req() req: Request,
    @Res() res: Response,
    @Query() query: DeleteProductCommand,
  ) {
    try {
      const response = await this.deleteProductService.handle(query);
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      console.log('Error during deleting product details', error);
      return handleError(res, error);
    }
  }
}
