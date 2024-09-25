import { HypermediaLink } from 'src/domain/common/link';
import { httpMethods } from 'src/infrastructure/common/constant';

export class GetUserLink extends HypermediaLink {
  constructor(params: string = '{?uuid}') {
    super('self', `/users/${params}`, httpMethods.GET);
  }
}
