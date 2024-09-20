import { Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/infrastructure/repositories/product/product.repository';
// import { AddHypermediaLinks } from 'src/infrastructure/common/add-hypermedia-links';

@Injectable()
export class GetProductHandler {
  constructor(private readonly productRepository: ProductRepository) {}

  public async handle(uuid: string): Promise<any> {
    return this.productRepository.getProductByUUID(uuid);
  }
}
