import {
  Field,
  GraphQLISODateTime,
  Int,
  ObjectType,
  registerEnumType,
} from "@nestjs/graphql";
import { FileType } from "../enums/file-type.enum";

import { v4 } from "uuid";
import {
  AfterLoad,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";

registerEnumType(FileType, { name: "FileType" });

@Entity()
@ObjectType()
export class File {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: "enum", enum: FileType, default: FileType.AVATAR })
  @Field((type) => FileType)
  type: FileType;

  @Column()
  @Field()
  fileName: string;

  @Column()
  @Field()
  originalFileName: string;

  @Column({nullable: true})
  @Field({nullable: true})
  copyright?: string

  @Column()
  @Field()
  mime: string;

  @Field(() => Int)
  @Column()
  size: number;

  @Column()
  @Field()
  key: string;

  @OneToOne(() => User)
  @Field(() => User)
  user: User;

  @Field()
  url: string;

  @AfterLoad()
  getUrl() {
    this.url = `http://localhost:3000/files/${this.key}`;
  }

  @Column()
  @Field((type) => GraphQLISODateTime)
  createdAt: Date = new Date();

  @Column({ nullable: true })
  @Field((type) => GraphQLISODateTime, { nullable: true })
  updatedAt?: Date;
}
