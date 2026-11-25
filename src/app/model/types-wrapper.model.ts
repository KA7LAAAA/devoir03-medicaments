import { Types } from './types.model';

export class TypesWrapper {
  _embedded!: {
    types?: Types[];
    categories?: Types[];
  };
}
