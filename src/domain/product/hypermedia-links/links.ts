import { HypermediaLink } from 'src/domain/common/link';
import { ListProductCommand } from 'src/features/product/list-product/list-product.dto';

export class AddProductLink extends HypermediaLink {
  constructor() {
    super('add-product', '/products', 'POST');
  }
}

export class GetProductLink extends HypermediaLink {
  constructor(params: string = '{?uuid}') {
    super('self', `/products/${params}`, 'GET');
  }
}

export class ListProductLink extends HypermediaLink {
  constructor(query?: ListProductCommand) {
    const { page = 1, limit = 10, user_id } = query;
    super(
      'list-product',
      `/products?page=${page}&limit=${limit}${user_id ? `&user_id=${user_id}` : ''}`,
      'GET',
    );
  }
}

export class DeleteProductLink extends HypermediaLink {
  constructor(params: string = '{?uuid}') {
    super('delete-product', `/products/${params}`, 'DELETE');
  }
}
