import { InjectRepository } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

export const CrudService = function <T>(entity: EntityClassOrSchema) {
  class CrudServiceMixin {
    constructor(@InjectRepository(entity) readonly repository: Repository<T>) {}

    async find(options: FindManyOptions) {
      return await this.repository.find(options);
    }

    async paginate(offset: number, limit: number, options: FindManyOptions<T>) {
      const total = await this.repository.count();

      const pagination = {
        total,
        page: offset / limit + 1,
        totalPages: Math.ceil(total / limit),
      };

      const entities = await this.repository.find({
        skip: offset,
        take: limit,
        ...options,
      });

      return {
        pagination,
        results: entities,
      };
    }

    async findAll() {
      return await this.repository.find();
    }

    async findOne(options: FindOneOptions<T>) {
      return await this.repository.findOne(options);
    }

    async findOneOrFail(options: FindOneOptions<T>) {
      return await this.repository.findOneOrFail(options);
    }

    async create(entityLike: DeepPartial<T>): Promise<T> {
      const entity = this.repository.create(entityLike);
      await this.repository.save(entity);
      return entity;
    }

    async update(where: FindOptionsWhere<T>, entityLike: Record<string, any>) {
      await this.repository.update(where, entityLike);
      const entity = await this.repository.findOneOrFail({ where });
      return await this.repository.preload(entity);
    }

    async remove(where: FindOptionsWhere<T>) {
      const entity = await this.repository.findOneOrFail({ where });
      const entityCopy = { ...entity };
      await this.repository.remove(entity);

      return entityCopy;
    }
  }

  return CrudServiceMixin;
};
