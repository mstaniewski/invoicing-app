import { Injectable } from '@nestjs/common';
import { Action } from 'casl/interface/enums/action.enum';
import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { PermissionsService } from 'casl/domain/services/permissions.service';
import { User } from '@netm8/common';

type Subjects = InferSubjects<typeof User> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  constructor(private readonly permissionsService: PermissionsService) {}

  createForUser(user: User) {
    const { can, build } = new AbilityBuilder<Ability<[Action, Subjects]>>(
      Ability as AbilityClass<AppAbility>,
    );

    if (user.role.name === 'studio_owner') {
      can(Action.Manage, 'all');
    } else {
      can(Action.Read, 'all');
    }
    const { checkPermission } = this.permissionsService;
    // const permissions = user.role.permissions.getItems();

    // if (checkPermission(permissions, 'project:create')) {
    //   can(Action.Create, Project);
    // }

    // if (checkPermission(permissions, 'project:show')) {
    //   can(Action.Read, Project);
    // }

    // if (checkPermission(permissions, 'project:update')) {
    //   can(Action.Update, Project);
    // }

    // if (checkPermission(permissions, 'project:remove')) {
    //   can(Action.Delete, Project);
    // }

    // if (checkPermission(permissions, 'frame:create')) {
    //   can(Action.Create, Frame);
    // }

    // if (checkPermission(permissions, 'frame:show')) {
    //   can(Action.Read, Frame);
    // }

    // if (checkPermission(permissions, 'frame:update')) {
    //   can(Action.Update, Frame);
    // }

    // if (checkPermission(permissions, 'frame:remove')) {
    //   can(Action.Delete, Frame);
    // }

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
