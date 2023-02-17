import { Field, HideField, Int, ObjectType, ResolveField } from '@nestjs/graphql';
import bcrypt from 'bcryptjs';
import { FileType } from '../enums/file-type.enum';

import {
  AfterLoad,
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { File } from './file.entity';
import { Role } from './role.entity';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  @Unique("unique_email", ["email"])
  email: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  @HideField()
  password: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  lastName: string;

  @ManyToOne(() => Role)
  @Field(() => Role)
  role: Role;

  @Field(() => File, { nullable: true })
  @OneToOne(() => File, (file) => file.user, { nullable: true })
  @JoinColumn()
  avatar: File;

  @AfterLoad()
  getAvatar() {
    this.avatar = this.avatar || {
      id: 0,
      url: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
      type: FileType.AVATAR,
      fileName: "placeholder",
      mime: "image/jpeg",
      originalFileName: "uknonwn",
      size: 100,
      user: null,
      key: "d",
      createdAt: new Date(),
      getUrl() {
        return "";
      },
    };
  }

  @ResolveField(() => String)
  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  @BeforeInsert()
  public async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  public hashPasswordSync() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}
