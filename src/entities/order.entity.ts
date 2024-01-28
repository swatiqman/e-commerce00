/* eslint-disable prettier/prettier */
import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { UserEntity } from './user.entity';
import { BaseEntity } from './base.entity';
import { ProductLineModel } from 'src/app.interface';

@Entity('orders')
export class OrderEntity extends BaseEntity {
  @Column()
  userId!: string;

  @ManyToOne(() => UserEntity, (user) => user.id, {eager: true})
  @JoinColumn({ name: 'userId' })
  user?: UserEntity;

  @OneToMany('ProductLineEntity', 'order', {
    eager: true,
    cascade: true,
  })
  productLines?: Partial<ProductLineModel>[];
}
