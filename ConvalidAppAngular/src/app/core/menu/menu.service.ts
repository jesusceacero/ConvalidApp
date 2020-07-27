import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class MenuService {

  constructor(public translate: TranslateService) {}

  getAll() {
    return [
      {
        link: '/admin/users',
        label: this.translate.instant('Usuarios'),
        icon: 'supervised_user_circles'
      },
      {
        link: '/admin/courses',
        label: this.translate.instant('Curso'),
        externalRedirect: true,
        icon: 'straighten'
      },
      {
        link: '/admin/modules',
        label: this.translate.instant('Modulos'),
        externalRedirect: true,
        icon: 'local_library'
      },
      {
        link: '/admin/schedules',
        label: this.translate.instant('Horarios'),
        externalRedirect: true,
        icon: 'alarm',
      },
      {
        link: '/admin/historial',
        label: this.translate.instant('Historial'),
        externalRedirect: true,
        icon: 'assignment',
      },
      {
        link: '/',
        label: this.translate.instant('Log Out'),
        externalRedirect: true,
        icon: 'exit_to_app',
      }
    ];
  }
}
