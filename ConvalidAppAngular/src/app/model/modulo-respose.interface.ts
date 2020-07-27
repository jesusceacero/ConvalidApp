import { Schedule } from './schedule-response.interfce';
import { User } from './user.interface';

export interface Modulo {
    id: string;
    name: string;
    acronym: string;
    teacher: User;
    horario: Schedule[];
    course: string;
}