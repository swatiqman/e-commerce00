/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ default: 0 })
  stock!: number;

  @Column({ default: 0, type: 'decimal' })
  price!: number;

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
