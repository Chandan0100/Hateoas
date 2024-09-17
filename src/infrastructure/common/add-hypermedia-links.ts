import { Injectable } from '@nestjs/common';
import { HALLink } from 'src/features/product/get-product/HAL.interface';

@Injectable()
export class AddHypermediaLinks<T> {
  data: T;
  constructor(data: T) {
    this.data = data;
  }

  public getData() {
    return this.data;
  }

  public addLink(rel: string, HALLinkObject: HALLink) {
    this.data['_links'] = {
      ...this.data['_links'],
      [rel]: HALLinkObject,
    };

    return this;
  }

  public addEmbedded({ field, rel }: { field: string; rel: string }) {
    if (!this.data[field]) {
      throw new Error(`field '${field}' doesn't exits on resource`);
    }
    this.data['_embedded'] = {
      ...this.data['_embedded'],
      [rel]: this.data[field],
    };
    delete this.data[field];
    return this;
  }
}
