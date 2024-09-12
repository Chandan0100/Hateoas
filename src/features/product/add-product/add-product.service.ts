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
    try {
      const product =
        await this.productRepository.createProduct(productPayload);
      let data = await this.getProductService.handle(product.uuid);
      return data;
    } catch (error) {
      throw error;
    }
  }
}
