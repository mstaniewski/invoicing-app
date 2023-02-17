import { User } from '@calovo/common';
import { AppAbility } from 'casl/infrastructure/factories/casl-ability.factory';
import { Action } from 'casl/interface/enums/action.enum';
import { IPolicyHandler } from 'casl/interface/types/policy-handler.type';

export class CreateUserPolicy implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Create, User);
  }
}
