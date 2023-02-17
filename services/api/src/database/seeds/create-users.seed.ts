import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const repository = await connection.getTreeRepository(User);

    const entities = await repository.create([
      {
        id: 1,
        email: 'admin@netm8.com',
        password: 'test',
        firstName: 'Admin',
        lastName: 'Administrator',
        role: { id: 1 },
        account: { owner: { id: 1 }, plan: { id: 1 }, users: [{ id: 1 }] },
      },
      {
        id: 2,
        email: 'manager@netm8.com',
        password: 'test',
        firstName: 'Manager',
        lastName: 'Manager',
        role: { id: 2 },
        account: { owner: { id: 2 }, plan: { id: 1 }, users: [{ id: 2 }] },
      },
      {
        id: 3,
        email: 'moderator@netm8.com',
        password: 'test',
        firstName: 'Moderator',
        lastName: 'Moderator',
        role: { id: 3 },
        account: { owner: { id: 3 }, plan: { id: 1 }, users: [{ id: 3 }] },
      },
      {
        id: 4,
        email: 'user@netm8.com',
        password: 'test',
        firstName: 'User',
        lastName: 'User',
        role: { id: 4 },
        account: { owner: { id: 4 }, plan: { id: 1 }, users: [{ id: 4 }] },
      },
    ]);

    await repository.save(entities);
  }
}
