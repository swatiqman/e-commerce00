/* eslint-disable prettier/prettier */
import { CustomRepository } from 'src/decorators/typeorm/typeorm-ex.decorator';
import { OrderEntity } from 'src/entities/order.entity';
import { Repository } from 'typeorm';

@CustomRepository(OrderEntity)
export class OrderRepository extends Repository<OrderEntity> {}
