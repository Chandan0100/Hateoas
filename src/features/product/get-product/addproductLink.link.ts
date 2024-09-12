import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import { GetProductsHandler } from 'src/features/product/list-product/list-product.service';
import { HALLink } from './HAL.interface';

@Injectable()
export class AddProductLinkService<T> {
  data: T;
  constructor(data: T) {
    this.data = data;
  }

  public getData() {
    return this.data;
  }

  public addLink(rel: string, obj: string | HALLink) {
    if (typeof obj === 'string') {
      obj = { href: obj };
    }
    this.data = {
      ...this.data,
      _links: { ...this.data['_links'], [rel]: obj },
    };
    return this;
  }

  public addEmbedded(
    obj1: { field: string; rel: string },
    obj: string | HALLink,
  ) {
    if (typeof obj === 'string') {
      obj = { href: obj };
    }
    if (!this.data[obj1.field]) {
      throw new Error(`field '${obj1.field}' doesn't exits on resource`);
    }
    this.data = {
      ...this.data,
      _embedded: {
        ...this.data['_embedded'],
        [obj1.field]: obj.href
          ? {
              ...this.data[obj1.field],
              _link: {
                [obj1.rel]: obj,
              },
            }
          : this.data[obj1.field].map((ele:any) => ({
              ...ele,
              _link: {
                [obj1.rel]: obj,
              },
            })),
      },
    };
    this.data[obj1.field] = undefined;
    return this;
  }
}
