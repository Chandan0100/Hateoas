import { Injectable } from '@nestjs/common';
import { AddProduct } from './add-product.interface';
import { ProductRepository } from 'src/infrastructure/repositories/product/product.repository';
import { GetProductHandler } from '../get-product/get-product.service';

@Injectable()
export class AddProductHandler {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly getProductService: GetProductHandler,
  ) {}

  public async handle(productPayload: AddProduct) {
    const product = await this.productRepository.createProduct(productPayload);
    return await this.getProductService.handle(product.uuid);
  }
}
