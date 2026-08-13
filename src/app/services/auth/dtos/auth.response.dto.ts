import { UserResponseDto } from '@services/user/dtos/user.response/user.response.dto';

export type AuthResponsePayload = {
    type: string;
    token: string;
    refreshToken?: string;
};

export type AuthResponseData = {
    user: UserResponseDto;
    payload: AuthResponsePayload;
};

export type AuthResponseDto = {
    status: 'success';
    data: AuthResponseData;
};
