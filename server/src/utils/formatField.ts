import QueryString from 'qs';

import { Field } from '../types/Field.js';

export const formatField = (
  field: string | QueryString.ParsedQs | string[] | QueryString.ParsedQs[]
) => {
  switch (field) {
    case Field.USERNAME:
      return Field.USERNAME;

    case Field.EMAIL:
      return Field.EMAIL;

    case Field.DATE:
      return 'created_at';

    default: 
      return 'created_at';
  }
}
