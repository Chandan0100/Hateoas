import { Injectable } from '@nestjs/common';
import { Product } from 'src/domain/product/product.entity';
import { User } from 'src/domain/user/user.entity';
import { AddProduct } from 'src/features/product/add-product/add-product.interface';
import { GetProduct } from 'src/features/product/list-product/list-product.interface';
import { DataSource, Equal, Repository } from 'typeorm';

@Injectable()
export class ProductRepository extends Repository<Product> {
  constructor(private dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }

  public async createProduct(payload: AddProduct): Promise<Product> {
    return this.save(payload);
  }
  async getProductByUUID(uuid: string) {
    return this.createQueryBuilder('product')
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
    return this.delete({ uuid });
  }

  async listProduct(payload: GetProduct) {
    const criteria = [];

    if (payload.user_id) {
      criteria.push({ user_id: Equal(payload.user_id) });
    }

    const response = await this.findAndCount({
      where: criteria,
      skip: payload.offset,
      take: payload.limit,
    });

    return {
      rows: response[0],
      count: response[1],
      page: payload.page,
      limit: payload.limit,
    };
  }
}
