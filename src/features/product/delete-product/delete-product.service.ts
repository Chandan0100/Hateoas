import { Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/infrastructure/repositories/product/product.repository';

@Injectable()
export class DeleteProductServiceHandler {
  constructor(private readonly productRepository: ProductRepository) {}

  public async handle(uuid: string) {
    return this.productRepository.deleteProductByUUID(uuid);
  }
}
