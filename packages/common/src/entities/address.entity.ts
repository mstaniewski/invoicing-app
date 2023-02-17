import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Column } from "typeorm";

@ObjectType()
export abstract class Address {
    @Field()
    @Column()
    street: string

    @Field()
    @Column()
    zipcode: string

    @Field()
    @Column()
    city: string
    

    @Field()
    @Column()
    state: string
    

    @Field()
    @Column()
    country: string
}

@InputType()
export class AddressInput extends Address {
    @Field()
    @Column()
    street: string

    @Field()
    @Column()
    zipcode: string

    @Field()
    @Column()
    city: string


    @Field()
    @Column()
    state: string


    @Field()
    @Column()
    country: string
}