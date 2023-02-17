import { Role } from '@netm8/common';
import { Injectable } from '@nestjs/common';
import { CrudService } from 'shared/services/crud.service';

@Injectable()
export class RolesService extends CrudService<Role>(Role) {}
