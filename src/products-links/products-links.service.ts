// products-links.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductsLinks } from '../schemas/product-links.schema';

@Injectable()
export class ProductsLinksService {
    constructor(
        @InjectModel(ProductsLinks.name, 'productsLinksDb')
        private readonly productsLinksModel: Model<ProductsLinks>,
    ) { }

    async findOne(): Promise<ProductsLinks> {
        const productsLinks = await this.productsLinksModel.findOne().exec();
        if (!productsLinks) {
            throw new NotFoundException('Products links not found');
        }
        return productsLinks;
    }


    async findAllByCategory(category: string): Promise<string[]> {
        const productsLinks = await this.productsLinksModel.findOne().exec();
        if (!productsLinks || !productsLinks[category]) {
            throw new NotFoundException(`Links for category '${category}' not found`);
        }
        return productsLinks[category];
    }
  
    async update(category: string, urls: string[]): Promise<string[]> {
        let productsLinks = await this.productsLinksModel.findOne().exec();
    
        // If no document found, create a new one
        if (!productsLinks) {
            productsLinks = new this.productsLinksModel();
        }
    
        switch (category) {
            case 'carpets':
                productsLinks.carpets = urls;
                break;
            case 'hardwoods':
                productsLinks.hardwoods = urls;
                break;
            case 'vinyls':
                productsLinks.vinyls = urls;
                break;
            case 'tiles':
                productsLinks.tiles = urls;
                break;
            case 'sinks':
                productsLinks.sinks = urls;
                break;
            case 'faucets':
                productsLinks.faucets = urls;
                break;
            case 'vanities':
                productsLinks.vanities = urls;
                break;
            default:
                throw new NotFoundException(`Category ${category} not found`);
        }
    
        await productsLinks.save();
        return urls; // Return only the updated array of URLs
    }
}
