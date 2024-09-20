import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map } from 'rxjs/operators';
import {
  GetProductLink,
  ListProductLink,
} from 'src/domain/product/hypermedia-links/links';
import { AddHypermediaLinks } from 'src/infrastructure/common/add-hypermedia-links';
import { ListProductCommand } from './list-product.dto';
import { plainToInstance } from 'class-transformer';
import { Product } from 'src/domain/product/product.entity';

@Injectable()
export class ListProductInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const requestQuery = context.switchToHttp().getRequest().query;
    const query = plainToInstance(ListProductCommand, requestQuery);

    return next.handle().pipe(
      catchError((error) => {
        throw error;
      }),
      map((products) => {
        const totalPages = Math.ceil(products.count / query.limit);

        const addProductLinks = {
          products: products.rows.map((product: Product) => {
            const getProductLink = new GetProductLink(product.uuid);
            const productWithLinks = new AddHypermediaLinks(product);
            return productWithLinks
              .addLink(getProductLink.getKey(), getProductLink.getLink())
              .getData();
          }),
          count: products.count,
        };

        const response = new AddHypermediaLinks(addProductLinks);

        if (query.page < totalPages) {
          response.addLink(
            'next',
            new ListProductLink({ ...query, page: query.page + 1 }).getLink(),
          );
        }

        if (query.page > 1 && products.rows.length) {
          response.addLink(
            'prev',
            new ListProductLink({ ...query, page: query.page - 1 }).getLink(),
          );
        }

        response
          .addLink('self', new ListProductLink(query).getLink())
          .addLink(
            'first',
            new ListProductLink({ ...query, page: 1 }).getLink(),
          )
          .addLink(
            'last',
            new ListProductLink({ ...query, page: totalPages }).getLink(),
          )
          .addEmbedded({ field: 'products', rel: 'products' })
          .getData();

        return response;
      }),
    );
  }
}
