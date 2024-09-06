import { GetProductsHandler } from './list-product/list-product.service';
import { Module } from '@nestjs/common';
import { DeleteProductController } from './delete-product/delete-product.controller';
import { AddProductHandler } from './add-product/add-product.service';
import { GetAllProductController } from './list-product/list-product.controller';
import { DeleteProductServiceHandler } from './delete-product/delete-product.service';
import { ProductRepository } from 'src/infrastructure/repositories/product/product.repository';
import { AddProductController } from './add-product/add-product.controller';
import { UpdateProductController } from './update-product/update-product.controller';
import { UpdateProductService } from './update-product/update-product-service';
import { GetProductController } from './get-product/get-product.controller';
import { GetProductHandler } from './get-product/get-product.service';

@Module({
  imports: [],
  controllers: [
    DeleteProductController,
    AddProductController,
    UpdateProductController,
    GetAllProductController,
    GetProductController,
  ],
  providers: [
    AddProductHandler,
    DeleteProductServiceHandler,
    GetProductsHandler,
    UpdateProductService,
    GetProductHandler,
    ProductRepository,
  ],
})
export class ProductModule {}
