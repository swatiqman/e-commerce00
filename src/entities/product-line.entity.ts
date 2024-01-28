/* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { OrderEntity } from './order.entity';
import { ProductEntity } from './product.entity';
import { BaseEntity } from './base.entity';

@Entity('product-lines')
export class ProductLineEntity extends BaseEntity {
  
  @Column()
  quantity!: number;

  @Column()
  orderId!: string;

  @Column()
  productId!: string;


  @ManyToOne(() => OrderEntity, (order) => order.id)
  @JoinColumn({ name: 'orderId' })
  order?: OrderEntity;

  @ManyToOne(() => ProductEntity, (product) => product.id, {eager: true})
  @JoinColumn({ name: 'productId' })
  product?: ProductEntity;
}
