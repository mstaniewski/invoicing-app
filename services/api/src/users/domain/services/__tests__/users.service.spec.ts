import { User } from '@calovo/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { UsersService } from '../users.service';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    find: jest.fn((entity) => entity),
    findOne: jest.fn((entity) => entity),
    create: jest.fn((entity) => entity),
    save: jest.fn((entity) => entity),
  }),
);

export const eventEmitterMockFactory = () => ({
  emit(event: string, payload: any) {},
});

export const dataSourceMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({}),
);

describe('UsersService', () => {
  let service: UsersService;
  let ee: EventEmitter2;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: EventEmitter2, useFactory: eventEmitterMockFactory },
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
    ee = module.get<EventEmitter2>(EventEmitter2);
  });

  describe('create', () => {
    it('should emit user.created event on success', async () => {
      const emitSpy = jest.spyOn(ee, 'emit');
      const entity = await service.create({
        email: 'test@test.pl',
        password: 'test',
        firstName: 'Test',
        lastName: 'Test',
        role: { id: 0 },
        avatar: { id: 0 },
      });
      expect(emitSpy).toHaveBeenCalledWith('user.created', entity);
      expect(emitSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('typeAheadUsers', () => {
    it('should call repository find with proper query', async () => {
      const findSpy = jest.spyOn(repository, 'find');
      await service.typeAheadUsers('test');

      expect(findSpy).toHaveBeenCalledWith({
        where: { email: ILike(`%test%`) },
      });

      expect(findSpy).toHaveBeenCalledTimes(1);
    });
  });
});
