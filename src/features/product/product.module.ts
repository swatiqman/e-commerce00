import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmExModule } from 'src/decorators/typeorm/typeorm-ex.module';
import { ProductRepository } from 'src/repositories/product.repository';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [TypeOrmExModule.forCustomRepository([ProductRepository])],
})
export class ProductModule {}
