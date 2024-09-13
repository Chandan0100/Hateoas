import { Injectable } from '@nestjs/common';
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

  public addLink(rel: string, linkObject: string | HALLink) {
    if (typeof linkObject === 'string') {
      linkObject = { href: linkObject };
    }
    this.data = {
      ...this.data,
      _links: { ...this.data['_links'], [rel]: linkObject },
    };
    return this;
  }

  public addEmbedded(
    obj1: { field: string; rel: string },
    linkObject: string | HALLink,
  ) {
    if (typeof linkObject === 'string') {
      linkObject = { href: linkObject };
    }
    if (!this.data[obj1.field]) {
      throw new Error(`field '${obj1.field}' doesn't exits on resource`);
    }
    this.data = {
      ...this.data,
      _embedded: {
        ...this.data['_embedded'],
        [obj1.field]: linkObject.href
          ? {
              ...this.data[obj1.field],
              _link: {
                [obj1.rel]: linkObject,
              },
            }
          : this.data[obj1.field].map((ele: any) => ({
              ...ele,
              _link: {
                [obj1.rel]: linkObject,
              },
            })),
      },
    };
    this.data[obj1.field] = undefined;
    return this;
  }
}
