import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "./address.entity";

@ObjectType()
@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column(() => Address, { prefix: false })
  @Field(() => Address)
  address: Address;

  @Column(() => Address)
  @Field(() => Address)
  billing: Address;

  @Column({ nullable: true })
  @Field({ nullable: true })
  billingEmail: string;

  @Column()
  @Field()
  taxId: string;

  @Column({type: 'timestamp', nullable: true})
  @Field({ nullable: true })
  trialEndsAt: Date;
}
