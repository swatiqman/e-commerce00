/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import {
  EntityNotFoundError,
  FindManyOptions,
  FindOptionsOrderProperty,
  FindOptionsRelations,
  ObjectLiteral,
  Repository,
} from 'typeorm';

export const findOneEntity = async <T extends ObjectLiteral>(
  repo: Repository<T>,
  name: string,
  id: string,
  loadEagerRelations = false,
  partition?: Record<string, unknown>,
  relations?: FindOptionsRelations<T> | undefined,
) => {
  try {
    return await repo.findOneOrFail({
      where: { id, ...partition } as any,
      loadEagerRelations,
      relations,
    });
  } catch (error) {
    if (error instanceof EntityNotFoundError)
      throw new NotFoundException(`${name} does not exist`);

    throw new BadRequestException('finding entity Failed');
  }
};

export const findEntity = async <T extends ObjectLiteral>(
  repo: Repository<T>,
  pagination: IPaginationOptions,
  query?: Record<string, unknown>,
  reverseOrder = false as null | boolean,
  loadEagerRelations = false,
  partition?: Record<string, unknown>,
  relations?: FindOptionsRelations<T> | undefined,
  order?: FindOptionsOrderProperty<T> | undefined,
) => {
  const findOption = {
    order:
      reverseOrder !== null
        ? { createdAt: reverseOrder ? 'ASC' : 'DESC' }
        : order,
    where: { ...query, ...partition },
    loadEagerRelations,
    relations,
  } as FindManyOptions;
  if (pagination.limit && pagination.page)
    return await paginate<T>(repo, pagination, findOption);

  return await repo.find(findOption as FindManyOptions<T>);
};

export const createEntity = async <T extends ObjectLiteral>(
  repo: Repository<T>,
  name: string,
  dto: any,
  partition?: Record<string, unknown>,
) => {
  try {
    const newEntityToBeinserted: any = repo.create();

    // assign dto values to model
    for (const key of Object.keys(dto)) {
      newEntityToBeinserted[key] = dto[key];
    }

    // save entity in database
    return await repo.save({
      ...newEntityToBeinserted,
      ...partition,
    });
  } catch (error: any) {
    if (error?.code === '23505')
      throw new ConflictException(`${name} already exist`);

    throw new BadRequestException(error?.message);
  }
  // create new entity object
};

export const updateEntity = async <T extends ObjectLiteral>(
  repo: Repository<T>,
  name: string,
  id: string,
  body: any,
  partition?: Record<string, unknown>,
) => {
  // get entity by id
  const entity: any = await repo.findOne({
    where: { id, ...partition } as any,
    loadEagerRelations: false,
  });

  if (!entity) {
    // throw an error if entity was not found
    throw new NotFoundException(`${name} does not exist`);
  }

  // assign dto values to model
  for (const key of Object.keys(body)) {
    if (
      typeof body[key] === 'boolean' ||
      typeof body[key] === 'number' ||
      typeof body[key] === 'string'
    ) {
      entity[key] = body[key] ?? entity[key];
    } else if (body[key] === null) {
      entity[key] = null;
    } else {
      entity[key] = body[key] || entity[key];
    }
  }

  // update model
  return await repo.save<T>(entity);
};

export const deleteEntity = async <T extends ObjectLiteral>(
  repo: Repository<T>,
  name: string,
  queryOrId: string | Record<string, unknown>,
  soft = true,
) => {
  // check if entity exists
  if (soft) await repo.softDelete(queryOrId as any);
  else await repo.remove(queryOrId as any);

  return `${name} with id ${
    typeof queryOrId === 'string' ? queryOrId : (queryOrId as any)?.id
  } has been deleted`;
};
