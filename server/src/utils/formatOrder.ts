import QueryString from 'qs';

import { Order } from '../types/Order.js';

export const formatOrder = (
  order: string | QueryString.ParsedQs | string[] | QueryString.ParsedQs[]
) => {
  switch (order) {
    case Order.ASC:
      return 'ASC';

    case Order.DESC:
      return 'DESC';

    default:
      return 'ASC';
  }
}


