import { Course } from './course-response.interface';
import { Photo } from './photo.interface';

export interface User {
    id: string;
    email: string;
    fullname: string;
    role: string;
    password: string;
    birthdate: string;
    permissions: string;
    photo: Photo;
    course: string;
    convalidados: string[];
    extras: string[];
    imparte: string[];
}