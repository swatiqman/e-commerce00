import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmExModule } from 'src/decorators/typeorm/typeorm-ex.module';
import { OrderRepository } from 'src/repositories/order.repository';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [TypeOrmExModule.forCustomRepository([OrderRepository])],
})
export class OrderModule {}
