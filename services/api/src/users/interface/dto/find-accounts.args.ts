import { ArgsType } from '@nestjs/graphql';
import { Listable } from 'shared/utility/listable';

@ArgsType()
export class FindAccountsArgs extends Listable {}
