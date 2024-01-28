/* eslint-disable prettier/prettier */
import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('products')
export class ProductEntity extends BaseEntity {
  @Column()
  name!: string;

  @Column({ default: 0 })
  stock!: number;

  @Column({ default: 0, type: 'decimal' })
  price!: number;
}
