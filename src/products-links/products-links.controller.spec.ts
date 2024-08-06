import { Test, TestingModule } from '@nestjs/testing';
import { ProductsLinksController } from './products-links.controller';

describe('ProductsLinksController', () => {
  let controller: ProductsLinksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsLinksController],
    }).compile();

    controller = module.get<ProductsLinksController>(ProductsLinksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
