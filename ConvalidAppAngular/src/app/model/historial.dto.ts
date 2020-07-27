import { User } from './user.interface';
import { Modulo } from './modulo-respose.interface';
import { Schedule } from './schedule-response.interfce';

export class HistorialDto {
    public id: string;
    public user: User;
    public module: Modulo;
    public horario: Schedule;
    public fechayhora: Date;
}