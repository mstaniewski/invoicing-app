import { Account, Plan, User } from '@netm8/common';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersEventsListener {
  constructor(
    @InjectRepository(Account)
    private readonly accountsRepository: Repository<Account>,
    @InjectRepository(Plan)
    private readonly plansRepository: Repository<Plan>,
  ) {}

  @OnEvent('user.created')
  async handleUserCreatedEvent(payload: User) {
    const plan = await this.plansRepository.findOneOrFail({
      where: { key: 'free' },
    });
    const account = await this.accountsRepository.create({
      addons: {
        accountUserLogins: 1,
        jsonExportAllowed: false,
        unlimitedFeeds: false,
      },
      plan,
      options: {
        feedLimit: 5,
        memberLimit: 1,
      },
      address: {
        city: '',
        country: '',
        state: '',
        street: '',
        zipcode: '',
      },
      trialEndsAt: new Date(),
      owner: { id: payload.id },
      users: [{ id: payload.id }],
    });
    await this.accountsRepository.save(account);
  }
}
