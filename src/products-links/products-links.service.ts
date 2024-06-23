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
    
        // Function to handle appending and removing duplicates
        const appendAndRemoveDuplicates = (existingUrls: string[], newUrls: string[]): string[] => {
            const urlSet = new Set(existingUrls);
            newUrls.forEach(url => urlSet.add(url));
            return Array.from(urlSet);
        };
    
        let combinedUrls: string[] = [];
    
        switch (category) {
            case 'carpets':
                combinedUrls = productsLinks.carpets ? appendAndRemoveDuplicates(productsLinks.carpets, urls) : urls;
                productsLinks.carpets = combinedUrls;
                break;
            case 'hardwoods':
                combinedUrls = productsLinks.hardwoods ? appendAndRemoveDuplicates(productsLinks.hardwoods, urls) : urls;
                productsLinks.hardwoods = combinedUrls;
                break;
            case 'vinyls':
                combinedUrls = productsLinks.vinyls ? appendAndRemoveDuplicates(productsLinks.vinyls, urls) : urls;
                productsLinks.vinyls = combinedUrls;
                break;
            case 'tiles':
                combinedUrls = productsLinks.tiles ? appendAndRemoveDuplicates(productsLinks.tiles, urls) : urls;
                productsLinks.tiles = combinedUrls;
                break;
            case 'sinks':
                combinedUrls = productsLinks.sinks ? appendAndRemoveDuplicates(productsLinks.sinks, urls) : urls;
                productsLinks.sinks = combinedUrls;
                break;
            case 'faucets':
                combinedUrls = productsLinks.faucets ? appendAndRemoveDuplicates(productsLinks.faucets, urls) : urls;
                productsLinks.faucets = combinedUrls;
                break;
            case 'vanities':
                combinedUrls = productsLinks.vanities ? appendAndRemoveDuplicates(productsLinks.vanities, urls) : urls;
                productsLinks.vanities = combinedUrls;
                break;
            case 'countertops':
                combinedUrls = productsLinks.countertops ? appendAndRemoveDuplicates(productsLinks.countertops, urls) : urls;
                productsLinks.countertops = combinedUrls;
                break;
            case 'doors':
                combinedUrls = productsLinks.doors ? appendAndRemoveDuplicates(productsLinks.doors, urls) : urls;
                productsLinks.doors = combinedUrls;
                break;
            case 'laminates':
                combinedUrls = productsLinks.laminates ? appendAndRemoveDuplicates(productsLinks.laminates, urls) : urls;
                productsLinks.laminates = combinedUrls;
                break;
            default:
                throw new NotFoundException(`Category ${category} not found`);
        }
    
        await productsLinks.save();
        return combinedUrls; // Return the combined array of URLs
    }
    
    
    
}
