import { settings } from '../shared';

export const jwtOption = {
  global: true,
  secret: settings.secretKey,
  signOptions: { expiresIn: settings.token.expiresIn },
};
