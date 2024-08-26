import { Role } from './role/role.enum';

export type User = {
  id?: string;
  name: string;
  email: string;
  roles?: Role[];
  password?: string;
  active?: boolean;
  created?: string;
  updated?: string;
  deletedAt?: string | null;
};
