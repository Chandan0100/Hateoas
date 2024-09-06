import { Injectable } from '@nestjs/common';
import { Product } from 'src/domain/product/product.entity';
import { User } from 'src/domain/user/user.entity';
import { AddProduct } from 'src/features/product/add-product/add-product.interface';
import { GetProduct } from 'src/features/product/list-product/list-product.interface';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ProductRepository extends Repository<Product> {
  constructor(private dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }

  public async createProduct(
    payload: AddProduct,
    transaction = null,
  ): Promise<Product> {
    return await this.save(payload);
  }
  async getProductByUUID(uuid: string): Promise<Product | undefined> {
    return await this.createQueryBuilder('product')
      .where('product.uuid = :uuid', { uuid })
      .leftJoinAndMapOne(
        'product.user',
        User,
        'user',
        'product.user_id = user.uuid',
      )
      .select([
        'user.first_name',
        'user.last_name',
        'user.uuid',
        'product.uuid',
        'user.email',
        'product.name',
        'product.description',
        'product.amount',
      ])
      .getOne();
  }
  async deleteProductByUUID(uuid: string): Promise<any> {
    return await this.delete({ uuid });
  }

  async getAllProduct(payload: GetProduct) {
    let query = this.createQueryBuilder('product');

    if (payload.user_id) {
      return await query
        .where('product.user_id = :user_id', { user_id: payload.user_id })
        .getMany();
    }
    return await query.limit(payload.limit).offset(payload.page).getMany();
  }
}
