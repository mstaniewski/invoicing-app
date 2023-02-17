import { Permission } from '@nemt8/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PermissionsService {
  checkPermission(permissions: Permission[], key: string) {
    return permissions.find((permission) => key === permission.key);
  }
}
