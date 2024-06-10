import { Body, Controller, Get, HttpStatus, NotFoundException, Param, Post, Query, Res } from '@nestjs/common';
import { ProductsService } from './products.service';
// import { AllProductsType } from './products.interface';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { Response, query } from 'express';
import { CreateCarpetDto } from 'src/dto/create-carpet.dto';
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


  // @Post('/create-carpet')
  // async createCarpet(@Body() createCarpetDto: CreateCarpetDto) {
  //   return this.productsService.createCarpet(createCarpetDto);
  // }

  // @Post('/add/carpets') // Assuming you're using a framework like NestJS
  // async addCarpet(@Body() data: any, @Res() res: Response) {
  //   try {
  //     res.status(HttpStatus.OK).send({ message: 'Product Scrapping Started!'});
  //     const products = await axios.post('http://localhost:8000/getcarpet', {urls:data});
  //     if (products.status !== 200) {
  //       throw new Error('Failed to create carpet via external API');
  //     }
  //     const savedCarpet = await this.productsService.createCarpet(products.data[0]);
  //     // res.status(HttpStatus.OK).send({ message: 'Product Scrapped Successfully!', data });
  //     return savedCarpet;
  //   } catch (error) {
  //     console.error('Error creating carpet:', error.message);
  //     // Optionally, you may want to throw the error further to handle it elsewhere
  //     throw error;
  //   }
  // }

  // @Get('/add/hardwood')
  // async getHardwood() {
  //   try {
  //     const data = {
  //       urls: ["https://shawfloors.com/flooring/hardwood/details/landmark-sliced-oak-sw747/gateway"]
  //     }
  //     const products = await axios.post('http://localhost:8000/gethardwood', data);
  //     if (products.status !== 200) {
  //       throw new Error('Failed to create hardwood via external API');
  //     }
  //     const savedHardwood = await this.productsService.createHardwood(products.data[0]);
  //     return savedHardwood;
  //   } catch (error) {
  //     console.error('Error creating carpet:', error.message);
  //   }
  // }

  // @Get('/add/vinyl')
  // async getVinyl() {
  //   try {
  //     const data = {
  //       urls: ["https://shawfloors.com/flooring/carpet/details/vintage-revival-cc77b/turmeric"]
  //     }
  //     const products = await axios.post('http://localhost:8000/getvinyl', data);
  //     if (products.status !== 200) {
  //       throw new Error('Failed to create vinyl via external API');
  //     }
  //     const savedVinyl = await this.productsService.createVinyl(products.data[0]);
  //     return savedVinyl;
  //   } catch (error) {
  //     console.error('Error creating carpet:', error.message);
  //   }
  // }

  @Post('/add/products') // Assuming you're using a framework like NestJS
  async addProducts(@Body() data: any, @Res() res: Response) {
    try {
      // res.status(HttpStatus.OK).send({ message: 'Product Scrapping Started!'});
      // data = {urls:["https://www.build.com/daltile-m0elhexqpmsu/s1751241?uid=4139143&searchId=qKuQrQXAaE", "https://www.build.com/emser-tile-w80char1012mpk/s1619167?uid=3847156&searchId=DPapQ6R3ez"], folder:'tile'}
      const products = await axios.post('http://localhost:8000/fetch-products', data);
      if (products.status !== 200) {
        throw new Error('Failed to create carpet via external API');
      }
      const savedProducts = await this.productsService.createProducts(data?.category, products.data);
      return res.status(HttpStatus.CREATED).send({ message: 'Product Scrapped Successfully!', savedProducts });
    } catch (error) {
      console.error('Error creating carpet:', error.message);
      // Optionally, you may want to throw the error further to handle it elsewhere
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
  @Get('/topproducts/:category')
  async findTopProducts(@Param('category') category: string) {
    return this.productsService.findTopProducts(category);
  }
}
