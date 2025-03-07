import { ActiveFilter } from '../../../enums/active/active-filter.enum';
import { DeletedFilter } from '../../../enums/deleted/deleted-filter.enum';
import { UserOrder } from '../user-order/user-order.enum';

export type FindUserRequestDTO = {
  textQuery?: string;
  active?: ActiveFilter;
  deleted?: DeletedFilter;
  page?: number;
  pageSize?: number;
  orderBy?: UserOrder[];
};
