import { HypermediaLink } from 'src/domain/common/link';

export class GetUserLink extends HypermediaLink {
  constructor(params: string = '{?uuid}') {
    super('self', `/users/${params}`, 'GET');
  }
}
