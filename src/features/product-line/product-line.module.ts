import { Module } from '@nestjs/common';
import { ProductLineController } from './product-line.controller';
import { ProductLineService } from './product-line.service';
import { TypeOrmExModule } from 'src/decorators/typeorm/typeorm-ex.module';
import { ProductLineRepository } from 'src/repositories/product-line.repository';

@Module({
  controllers: [ProductLineController],
  providers: [ProductLineService],
  imports: [TypeOrmExModule.forCustomRepository([ProductLineRepository])],
})
export class ProductLineModule {}
