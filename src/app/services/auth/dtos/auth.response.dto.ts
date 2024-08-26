import { User } from '../../user/user.response.dto';

export type AuthResponsePayload = {
  type: string;
  token: string;
  refreshToken?: string;
};

export type AuthResponseData = {
  user: User;
  payload: AuthResponsePayload;
};

export type AuthResponseDto = {
  status: 'success';
  data: AuthResponseData;
};
