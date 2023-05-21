import { CreatedUserResponse } from './created-user.response';

export class RegistrationResponse {
  user: CreatedUserResponse;
  token: string;
}
