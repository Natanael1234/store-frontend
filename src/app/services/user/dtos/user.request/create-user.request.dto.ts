import { Role } from '@services/user/dtos/role/role.enum';

export type CreateUserRequestDto = {
    id?: string;
    name: string;
    email: string;
    roles?: Role[];
    active?: boolean;
    deletedAt?: boolean;
};
