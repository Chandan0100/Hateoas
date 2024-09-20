import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map } from 'rxjs/operators';
import { ListProductLink } from 'src/domain/product/hypermedia-links/links';
import { AddHypermediaLinks } from 'src/infrastructure/common/add-hypermedia-links';

@Injectable()
export class DeleteProductInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      catchError((error) => {
        throw error;
      }),
      map((product) => {
        if (!product) {
          return product;
        }
        const listProductLink = new ListProductLink();

        const response = new AddHypermediaLinks(product);
        response
          .addLink(listProductLink.getKey(), listProductLink.getLink())
          .getData();

        return product;
      }),
    );
  }
}
