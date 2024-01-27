/* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { OrderEntity } from './order.entity';
import { ProductEntity } from './product.entity';

@Entity('product-lines')
export class ProductLineEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  quantity!: number;

  @Column()
  orderId!: string;

  @Column()
  productId!: string;


  @ManyToOne(() => OrderEntity, (order) => order.id)
  @JoinColumn({ name: 'orderId' })
  order?: OrderEntity;

  @ManyToOne(() => ProductEntity, (product) => product.id)
  @JoinColumn({ name: 'productId' })
  product?: ProductEntity;

  // @OneToMany('ProductRetailEntity', 'product', {
  //   eager: false,
  // })
  // productRetails?: Record<string, unknown>[];

  // @OneToMany('ProductRetailPrimaryEntity', 'product', {
  //   eager: false,
  // })
  // productRetailPrimaries?: Record<string, unknown>[];

  // @OneToMany('ProductRetailSecondaryEntity', 'product', {
  //   eager: false,
  // })
  // productRetailSecondaries?: Record<string, unknown>[];
}
