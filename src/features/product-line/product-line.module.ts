import { Module } from '@nestjs/common';
import { ProductLineController } from './product-line.controller';
import { ProductLineService } from './product-line.service';

@Module({
  controllers: [ProductLineController],
  providers: [ProductLineService]
})
export class ProductLineModule {}
