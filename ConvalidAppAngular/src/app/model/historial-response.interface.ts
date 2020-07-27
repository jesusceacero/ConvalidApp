import { User } from './user.interface';
import { Schedule } from './schedule-response.interfce';
import { Modulo } from './modulo-respose.interface';

export interface Historial {
    id: string;
    user: string;
    module: string;
    horario: string;
    fechayhora: Date;
}