import { Modulo } from './modulo-respose.interface';

export interface Course {
    id: string;
    name: string;
    acronym: string;
    module: string[];
}