import { User } from './user.interface';
import { Schedule } from './schedule-response.interfce';
import { Course } from './course-response.interface';

export class ModuloCrudDTO {
    id: string;
    name: string;
    acronym: string;
    teacher: User;
    horario: Schedule[];
    course: Course;
}