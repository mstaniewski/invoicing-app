import { User } from '@netm8/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class RefreshToken {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  token: string;

  @Column()
  @Field(() => Boolean)
  isRevoked = false;

  @Column()
  @Field()
  expirationDate: Date;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;
}
