// products-links.controller.ts
import { Controller, Get, Put, Body, Param, NotFoundException, Query, HttpStatus, Post, Res } from '@nestjs/common';
import { ProductsLinksService } from './products-links.service';
import { ProductsLinksDto } from '../dto/products-links.dto';
import { ProductsLinks } from '../schemas/product-links.schema';
import axios from 'axios';
import { Response } from 'express';

@Controller('products-links')
export class ProductsLinksController {
    constructor(private readonly productsLinksService: ProductsLinksService) { }

    //   @Get()
    //   async findOne(): Promise<ProductsLinks> {
    //     return await this.productsLinksService.findOne();
    //   }

    @Get()
    async findLinksByCategory(@Query('category') category: string): Promise<string[]> {
        console.log(category)
        if (!category) {
            throw new NotFoundException('Category not provided');
        }
        return this.productsLinksService.findAllByCategory(category);
    }

    @Put('/get-urls')
    async update(@Body() data: { category: string, no: number}, @Res() res: Response): Promise<void> {
        const { category, no } = data;
        try {
            const products = await axios.post('http://localhost:8000/page-products-links', {no, category});
            if (products.status !== 200) {
                throw new Error('Failed to create carpet via external API');
            }
            if (!products.data?.product_links || !Array.isArray(products.data?.product_links)) {
                throw new NotFoundException('Invalid data format');
            }
            const updatedUrls = await this.productsLinksService.update(category, products.data?.product_links);
            
            res.status(HttpStatus.OK).send(updatedUrls); // Send only the array of updated URLs
        } catch (error) {
            throw error;
        }
    }

    // @Put('/category')
    // async update(@Body() data: { category: string, data: string[] }): Promise<ProductsLinks> {
    //   const { category, data: urls } = data;
    //   console.log(category, data)
    //   if (!urls || !Array.isArray(urls)) {
    //     throw new NotFoundException('Invalid data format');
    //   }
  
    //   return await this.productsLinksService.update(category, urls);
    // }
}
