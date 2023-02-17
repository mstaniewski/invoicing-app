import { User } from '@netm8/common';
import { faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';

define(User, (f: typeof faker, context: { roles: string[] }) => {
  const user = new User();
  const firstName = f.name.firstName();
  const lastName = f.name.lastName();

  user.email = f.internet.email(firstName, lastName);
  user.firstName = firstName;
  user.lastName = lastName;
  user.password = 'test';
  user.hashPasswordSync();

  return user;
});
