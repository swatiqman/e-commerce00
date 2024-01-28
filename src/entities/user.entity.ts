/* eslint-disable prettier/prettier */

import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column({ select: false })
  password!: string;
}
