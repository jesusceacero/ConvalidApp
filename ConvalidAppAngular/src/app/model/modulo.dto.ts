import { User } from './user.interface';
import { Schedule } from './schedule-response.interfce';

export class ModuloDTO {
    id: string;
    name: string;
    acronym: string;
    teacher: User;
    horario: Schedule;
}