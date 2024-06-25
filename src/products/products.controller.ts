import { Body, Controller, Get, HttpStatus, NotFoundException, Param, Post, Query, Res } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { Response, query } from 'express';
import axios from 'axios';

@Controller('/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

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

  @Post('/add/products') // Assuming you're using a framework like NestJS
  async addProducts(@Body() data: any, @Res() res: Response) {
    try {
      const products = await axios.post('http://localhost:8000/fetch-products', data);
      if (products.status !== 200) {
        throw new Error('Failed to create carpet via external API');
      }
      const savedProducts = await this.productsService.createProducts(data?.category, products.data);
      return res.status(HttpStatus.CREATED).send({ message: 'Product Scrapped Successfully!', savedProducts });
    } catch (error) {
      console.error('Error creating carpet:', error.message);
      throw error;
    }
  }

  @Post('/get-uids')
  async getAllUids(@Body('category') category: string): Promise<string[]> {
      if (!category) {
          throw new NotFoundException('Category not provided');
      }
      return this.productsService.findAllUids(category);
  }

  @Post('/get-product')
  async getByCategory(@Body('category') category: string, @Body('model') model: string[]): Promise<any> {
    if (!category) {
      throw new NotFoundException('Category not provided');
    }
    if (!model) {
      throw new NotFoundException('Model not provided');
    }
    // Await the result from the service
    const result = await this.productsService.findByCategory(category, model);
    return result;
  }

  @Get('/topproducts/:category')
  async findTopProducts(@Param('category') category: string) {
    return this.productsService.findTopProducts(category);
  }
}
