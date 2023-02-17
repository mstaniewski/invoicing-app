import { User } from '@netm8/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ACCESS_TOKEN_EXPIRY_TIME } from 'auth/domain/constants/jwt';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

import { UsersService } from 'users/domain/services/users.service';
import { AuthService } from '../auth.service';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

describe('UsersService', () => {
  let service: AuthService;
  let usersService: UsersService;

  const usersRepositoryMock: MockType<Repository<User>> = {
    find: jest.fn((options: FindManyOptions<User>) => []),
    findOneOrFail: jest.fn((options: FindOneOptions<User>) => ({})),
  };

  const jwtServiceMock: MockType<JwtService> = {
    sign: jest.fn(
      (payload: string | object | Buffer, options?: JwtSignOptions) => {
        return `hashed_${(payload as User).email}`;
      },
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        { provide: JwtService, useValue: jwtServiceMock },
        EventEmitter2,
        ConfigService,
        {
          provide: getRepositoryToken(User),
          useValue: usersRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('signIn', () => {
    it('should return user access token and payload', async () => {
      const credentials = {
        email: 'test@test.pl',
        password: 'test',
      };

      const user = {
        email: 'test@test.pl',
        password: 'hashed_password',
      };

      usersRepositoryMock.findOneOrFail.mockReturnValueOnce(user);

      const usersSpy = jest.spyOn(usersService, 'findOneOrFail');

      const result = await service.signIn(credentials);

      expect(usersSpy).toHaveBeenCalledWith({
        where: { email: credentials.email },
        relations: { account: true, role: { permissions: true } },
      });

      expect(jwtServiceMock.sign).toHaveBeenCalledWith(
        {
          email: user.email,
          sub: undefined,
          role: undefined,
        },
        { expiresIn: ACCESS_TOKEN_EXPIRY_TIME },
      );

      expect(result).toEqual([{ accessToken: `hashed_${user.email}` }, user]);
    });
  });
});
