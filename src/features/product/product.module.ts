import { GetProductsHandler } from './list-product/list-product.service';
import { Module } from '@nestjs/common';
import { DeleteProductController } from './delete-product/delete-product.controller';
import { AddProductHandler } from './add-product/add-product.service';
import { ListProductController } from './list-product/list-product.controller';
import { DeleteProductServiceHandler } from './delete-product/delete-product.service';
import { ProductRepository } from 'src/infrastructure/repositories/product/product.repository';
import { AddProductController } from './add-product/add-product.controller';
// import { UpdateProductController } from './update-product/update-product.controller';
// import { UpdateProductService } from './update-product/update-product-service';
import { GetProductController } from './get-product/get-product.controller';
import { GetProductHandler } from './get-product/get-product.service';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';

@Module({
  imports: [],
  controllers: [
    DeleteProductController,
    AddProductController,
    // UpdateProductController,
    ListProductController,
    GetProductController,
  ],
  providers: [
    DeleteProductServiceHandler,
    AddProductHandler,
    GetProductsHandler,
    // UpdateProductService,
    GetProductHandler,
    ProductRepository,
    UserRepository,
  ],
})
export class ProductModule {}
