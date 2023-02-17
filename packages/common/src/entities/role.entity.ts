import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Permission } from './permission.entity';

import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Role {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  displayName: string;

  @Column()
  @Field()
  description: string;

  @ManyToMany(() => Permission)
  @Field(() => [Permission])
  @JoinTable()
  permissions: Permission[];
}
