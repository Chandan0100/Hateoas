export class HALLink {
  href: string;
  title?: string;
  method?: 'GET' | 'PUT' | 'POST' | 'PATCH' | 'DELETE';
  templated?: boolean;
  name?: string;
  append?: string;
}
