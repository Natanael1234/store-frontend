import { Role } from '../role/role.enum';

export type UserResponseDto = {
    id: string;
    name: string;
    email: string;
    roles?: Role[];
    active?: boolean;
    created?: string;
    updated?: string;
    deletedAt?: string | null;
};
