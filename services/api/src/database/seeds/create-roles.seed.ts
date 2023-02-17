import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Role } from '@netm8/common';

export default class CreateRoles implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const repository = await connection.getTreeRepository(Role);

    const entities = await repository.create([
      {
        id: 1,
        name: 'admin',
        displayName: 'Administrator',
        description: 'desc',
      },
      {
        id: 2,
        name: 'manager',
        displayName: 'Manager',
        description: 'desc',
      },
      {
        id: 3,
        name: 'moderator',
        displayName: 'Moderator',
        description: 'desc',
      },
      {
        id: 4,
        name: 'user',
        displayName: 'User',
        description: 'desc',
      },
    ]);

    await repository.save(entities);
  }
}
