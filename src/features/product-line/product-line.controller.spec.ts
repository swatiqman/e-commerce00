import { Test, TestingModule } from '@nestjs/testing';
import { ProductLineController } from './product-line.controller';

describe('ProductLineController', () => {
  let controller: ProductLineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductLineController],
    }).compile();

    controller = module.get<ProductLineController>(ProductLineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
