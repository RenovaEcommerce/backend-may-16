import { Test, TestingModule } from '@nestjs/testing';
import { ProductsLinksService } from './products-links.service';

describe('ProductsLinksService', () => {
  let service: ProductsLinksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsLinksService],
    }).compile();

    service = module.get<ProductsLinksService>(ProductsLinksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
