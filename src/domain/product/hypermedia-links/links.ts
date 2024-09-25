import { HypermediaLink } from 'src/domain/common/link';
import { ListProductCommand } from 'src/features/product/list-product/list-product.dto';
import { httpMethods } from 'src/infrastructure/common/constant';

export class AddProductLink extends HypermediaLink {
  constructor() {
    super('add-product', '/products', httpMethods.POST);
  }
}

export class GetProductLink extends HypermediaLink {
  constructor(params: string = '{?uuid}') {
    super('self', `/products/${params}`, httpMethods.GET);
  }
}

export class ListProductLink extends HypermediaLink {
  constructor(query?: ListProductCommand) {
    const { page = 1, limit = 10, user_id } = query;
    super(
      'list-product',
      `/products?page=${page}&limit=${limit}${user_id ? `&user_id=${user_id}` : ''}`,
      httpMethods.GET,
    );
  }
}

export class DeleteProductLink extends HypermediaLink {
  constructor(params: string = '{?uuid}') {
    super('delete-product', `/products/${params}`, httpMethods.DELETE);
  }
}
