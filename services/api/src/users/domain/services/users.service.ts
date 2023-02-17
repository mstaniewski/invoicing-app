import { CreateUserInput, User } from '@calovo/common';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from 'shared/services/crud.service';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class UsersService extends CrudService<User>(User) {
  constructor(
    @InjectRepository(User) repository: Repository<User>,
    private readonly eventEmitter: EventEmitter2,
  ) {
    super(repository);
  }

  async create(data: CreateUserInput) {
    const entity = await super.create(data);
    this.eventEmitter.emit('user.created', entity);
    return entity;
  }

  async typeAheadUsers(query: string) {
    const users = await this.repository.find({
      where: {
        email: ILike(`%${query}%`),
      },
    });

    return users;
  }
}
