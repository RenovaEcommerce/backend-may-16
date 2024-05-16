import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AllProductsType } from './products.interface';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { query } from 'express';

@Controller('/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(@Query() query: ExpressQuery): Promise<{ data: any[], totalCount: number }> {
    return this.productsService.findAll(query);
  }

  @Get('/canada')
  async findCanadianProducts(): Promise<any[]> {
    return await this.productsService.findCanadianProducts();
  }

  @Get('/:category')
  async findAllProductsByCategory(
    @Param('category') category: string,
    @Query('page') page: string,
  ): Promise<any> {
    const query = { page };

    return this.productsService.findAllProductsByCategory(category, query);
  }

  @Get('/:category/:subcategory/:selected')
  async findAllProductsByAndFeature(
    @Param('category') category: string,
    @Param('subcategory') subcategoryKey: string,
    @Param('selected') selectedValue: string,
    @Query('page') page: string,
  ): Promise<any> {
    const query = { page };

    return this.productsService.findAllProductsByCategoryAndFeature(
      category,
      subcategoryKey,
      selectedValue,
      query,
    );
  }

  @Get('/:category/search')
  async searchByKeywordInCategory(
    @Param('category') category: string,
    @Query() query: ExpressQuery,
  ): Promise<any> {
    return this.productsService.searchByKeywordInCategory(category, query);
  }

  @Get('/topproducts/:category')
  async findTopProducts(@Param('category') category: string) {
    return this.productsService.findTopProducts(category);
  }
}
