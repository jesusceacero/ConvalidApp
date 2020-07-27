import { User } from './user.interface';

export interface loginResponse {
    usuario: User;
    token: string;
}