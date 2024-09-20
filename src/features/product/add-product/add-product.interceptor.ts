import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map } from 'rxjs/operators';
import {
  AddProductLink,
  DeleteProductLink,
  GetProductLink,
  ListProductLink,
} from 'src/domain/product/hypermedia-links/links';
import { GetUserLink } from 'src/domain/user/hypermedia-links/links';
import { AddHypermediaLinks } from 'src/infrastructure/common/add-hypermedia-links';

@Injectable()
export class AddProductInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      catchError((error) => {
        throw error;
      }),
      map((product) => {
        if (!product) {
          return product;
        }
        const getProductLink = new GetProductLink(product.uuid);
        const addProductLink = new AddProductLink();
        const listProductLink = new ListProductLink();
        const deleteProductLink = new DeleteProductLink(product.uuid);
        const getUserLink = new GetUserLink(product['user'].uuid);

        product['user'] = new AddHypermediaLinks(product['user'])
          .addLink(getUserLink.getKey(), getUserLink.getLink())
          .getData();

        const response = new AddHypermediaLinks(product);
        response
          .addLink(getProductLink.getKey(), getProductLink.getLink())
          .addLink(addProductLink.getKey(), addProductLink.getLink())
          .addLink(listProductLink.getKey(), listProductLink.getLink())
          .addLink(deleteProductLink.getKey(), deleteProductLink.getLink())
          .addEmbedded({ field: 'user', rel: 'request-user-details' })
          .getData();

        return product;
      }),
    );
  }
}
