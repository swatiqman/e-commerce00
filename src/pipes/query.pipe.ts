/* eslint-disable prettier/prettier */
import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class QueryPipe implements PipeTransform {
  transform(value: Record<string, unknown>) {
    // remove limit and page from values
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { limit, page, search, sort, order, ...query } = value;
    return query;
  }
}
