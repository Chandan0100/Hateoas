import { Injectable } from '@nestjs/common';
import { HALLink } from '../get-product/HAL.interface';

interface CustomHALLink extends HALLink {
  rel: string;
  queryParams?: string[];
  paramField?: string[];
}
@Injectable()
export class ListProductLinkService<T> {
  data: any;
  constructor(data: T) {
    this.data = data;
  }

  public getData() {
    return this.data;
  }

  public addCollection(alias: string, linkObject: CustomHALLink[]) {
    this.data = {
      [alias]: this.data[0].map((ele) => ({
        ...ele,
        _links: {
          ...linkObject.reduce((acc, obj) => {
            const { rel, queryParams, paramField, href, ...rest } = obj;
            const paramsString = this.handleParamsFields(ele, paramField);

            acc[rel] = {
              ...rest,
              href: `${href}/${paramsString}${queryParams?.length ? [`{?${queryParams.join(',')}}`] : ''}`,
              ...(queryParams?.length && {
                templated: true,
              }),
            };
            return acc;
          }, {}),
        },
      })),
      count: this.data[1],
    };
    return this;
  }

  private handleParamsFields(object: any, fields: any) {
    const getNestedValue = (object, path) => {
      return path
        .split('.')
        .reduce((acc, key) => (acc ? acc[key] : undefined), object);
    };

    const createParamString = (object, fields) => {
      return fields?.map((field) => {
          const value = getNestedValue(object, field);
          return value !== undefined
            ? `${field}=${encodeURIComponent(value)}`
            : null;
        })
        .filter(Boolean)
        .join('&');
    };

    const paramString = createParamString(object, fields);
    return paramString;
  }
}
