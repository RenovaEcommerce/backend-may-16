import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vanities } from 'src/schemas/vanities.schema';
import { Countertops } from 'src/schemas/countertops.schema';
import { Tiles } from 'src/schemas/tiles.schema';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { TopProduct } from 'src/schemas/topProducts.schema';
import { Carpets } from 'src/schemas/carpet.schema';
import { Hardwoods } from 'src/schemas/hardwoods.schema';
import { Vinyls } from 'src/schemas/vinyls.schema';
import { Laminates } from 'src/schemas/laminates.schema';
import { Doors } from 'src/schemas/doors.schema';
import { Sinks } from 'src/schemas/sinks.schema';
import { Faucets } from 'src/schemas/faucets.schema';

@Injectable()
export class ProductsService {
  private modelMap: { [key: string]: Model<any> };

  // selectedCategoryData;
  constructor(
    @InjectModel(Carpets.name, 'productsDb') private carpetsModel: Model<any>,
    @InjectModel(Hardwoods.name, 'productsDb') private hardwoodsModel: Model<any>,
    @InjectModel(Vinyls.name, 'productsDb') private vinylsModel: Model<any>,
    @InjectModel(Laminates.name, 'productsDb') private laminatesModel: Model<any>,
    @InjectModel(Tiles.name, 'productsDb') private tilesModel: Model<any>,
    @InjectModel(Countertops.name, 'productsDb') private countertopsModel: Model<any>,
    @InjectModel(Doors.name, 'productsDb') private doorsModel: Model<any>,
    @InjectModel(Sinks.name, 'productsDb') private sinksModel: Model<any>,
    @InjectModel(Faucets.name, 'productsDb') private faucetsModel: Model<any>,
    @InjectModel(Vanities.name, 'productsDb') private vanitiesModel: Model<any>,
    @InjectModel(TopProduct.name, 'productsDb') private topProductModel: Model<any>,
  ) {
    this.modelMap = {
      carpets: this.carpetsModel,
      hardwoods: this.hardwoodsModel,
      vinyls: this.vinylsModel,
      laminates: this.laminatesModel,
      tiles: this.tilesModel,
      countertops: this.countertopsModel,
      doors: this.doorsModel,
      sinks: this.sinksModel,
      faucets: this.faucetsModel,
      vanities: this.vanitiesModel,
    };
  }

  private getModel(modelName: string): Model<any> {
    switch (modelName.toLowerCase()) {
      case 'carpets':
        return this.carpetsModel;
      case 'hardwoods':
        return this.hardwoodsModel;
      case 'vinyls':
        return this.vinylsModel;
      case 'laminates':
        return this.laminatesModel;
      case 'tiles':
        return this.tilesModel;
      case 'countertops':
        return this.countertopsModel;
      case 'doors':
        return this.doorsModel;
      case 'sinks':
        return this.sinksModel;
      case 'faucets':
        return this.faucetsModel;
      case 'vanities':
        return this.vanitiesModel;
      default:
        throw new Error(`Unknown model name: ${modelName}`);
    }
  }
  async findAll(query?: ExpressQuery): Promise<{ data: any[], totalCount: number }> {
    const page = parseInt(query.page as string) || 1;
    const limit = parseInt(query.limit as string) || 8;
    const skip = (page - 1) * limit;
    const tile = await this.tilesModel.find().skip(skip).limit(limit).exec();
    const faucets = await this.faucetsModel.find().skip(skip).limit(limit).exec();
    const sinks = await this.sinksModel.find().skip(skip).limit(limit).exec();
    const laminates = await this.laminatesModel
      .find()
      .skip(skip)
      .limit(limit)
      .exec();

    const countertop = await this.countertopsModel
      .find()
      .skip(skip)
      .limit(limit)
      .exec();
    const vanities = await this.vanitiesModel
      .find()
      .skip(skip)
      .limit(limit)
      .exec();
    const doors = await this.doorsModel
      .find()
      .skip(skip)
      .limit(limit)
      .exec();
    const carpets = await this.carpetsModel
      .find()
      .skip(skip)
      .limit(limit)
      .exec();
    const vinyls = await this.vinylsModel
      .find()
      .skip(skip)
      .limit(limit)
      .exec();
    const hardwoods = await this.hardwoodsModel
      .find()
      .skip(skip)
      .limit(limit)
      .exec();
    // Объединяем результаты в один массив
    const combinedProducts = [...vanities, ...tile, ...doors, ...carpets, ...countertop, ...vinyls, ...laminates, ...hardwoods, ...faucets, ...sinks].sort(() => Math.random() - 0.5)
    const totalCounts = await Promise.all([
      this.tilesModel.countDocuments().exec(),
      this.vanitiesModel.countDocuments().exec(),
      this.carpetsModel.countDocuments().exec(),
      this.doorsModel.countDocuments().exec(),
      this.faucetsModel.countDocuments().exec(),
      this.vinylsModel.countDocuments().exec(),
      this.laminatesModel.countDocuments().exec(),
      this.hardwoodsModel.countDocuments().exec(),
      this.sinksModel.countDocuments().exec(),
      this.countertopsModel.countDocuments().exec()
    ]);

    // Sum up all counts
    const totalCount = totalCounts.reduce((acc, count) => acc + count, 0);

    return { data: combinedProducts, totalCount };
  }


  async findCanadianProducts(): Promise<Tiles[]> {
    return await this.tilesModel.find({ canada: true }).exec();
  }

  async findAllProductsByCategory(
    category: string,
    query: ExpressQuery,
  ): Promise<{ data: any[], totalCount: number }> {
    const page = parseInt(query.page as string) || 1;
    const limit = parseInt(query.limit as string) || 32;
    const skip = (page - 1) * limit;

    let model;
    switch (category.toLowerCase()) {
      case 'tiles':
        model = this.tilesModel;
        break;
      case 'countertops':
        model = this.countertopsModel;
        break;
      case 'vanities':
        model = this.vanitiesModel;
        break;
      case 'carpets':
        model = this.carpetsModel;
        break;
      case 'doors':
        model = this.doorsModel;
        break;
      case 'laminates':
        model = this.laminatesModel;
        break;
      case 'hardwoods':
        model = this.hardwoodsModel;
        break;
      case 'faucets':
        model = this.faucetsModel;
        break;
      case 'vinyls':
        model = this.vinylsModel;
        break;
      case 'sinks':
        model = this.sinksModel;
        break;
      default:
        // В случае если категория не соответствует, возможно стоит выбросить ошибку или вернуть пустой результат
        return { data: [], totalCount: 0 };
    }

    // Получаем данные с учетом пагинации
    const data = await model
      .find()
      .skip(skip)
      .limit(limit)
      .exec();

    // Получаем общее количество записей в категории
    const totalCount = await model.countDocuments().exec();

    return { data, totalCount };
  }


  async findAllProductsByCategoryAndFeature(
    category: string,
    subcategoryKey: string,
    selectedValue: string,
    query: ExpressQuery,
  ): Promise<{ data: any[], totalCount: number }> {
    const page = parseInt(query.page as string) || 1;
    const limit = parseInt(query.limit as string) || 2;
    const skip = (page - 1) * limit;

    // Создаём объект запроса с регулярным выражением и опциями
    const regexQuery = { $regex: new RegExp(selectedValue, 'i') };

    let model;
    switch (category.toLowerCase()) {
      case 'tiles':
        model = this.tilesModel;
        break;
      case 'countertops':
        model = this.countertopsModel;
        break;
      case 'vanities':
        model = this.vanitiesModel;
        break;
      case 'carpets':
        model = this.carpetsModel;
        break;
      case 'doors':
        model = this.doorsModel;
        break;
      case 'laminates':
        model = this.laminatesModel;
        break;
      case 'hardwoods':
        model = this.hardwoodsModel;
        break;
      case 'faucets':
        model = this.faucetsModel;
        break;
      case 'vinyls':
        model = this.vinylsModel;
        break;
      case 'sinks':
        model = this.sinksModel;
        break;
      default:
        return { data: [], totalCount: 0 };
    }

    // Выполняем запрос с учётом пагинации
    const data = await model
      .find({ [subcategoryKey]: regexQuery })
      .skip(skip)
      .limit(limit)
      .exec();

    // Получаем общее количество документов, соответствующих запросу
    const totalCount = await model.countDocuments({ [subcategoryKey]: regexQuery }).exec();

    return { data, totalCount };
  }

  async searchByKeywordInCategory(
    category: string,
    query: any,
  ): Promise<{ data: any[], totalCount: number }> {
    const model = this.modelMap[category];
    if (!model) {
      throw new Error(`Unknown category: ${category}`);
    }
    const searchCriteria = Object.keys(query).reduce((criteria, key) => {
      const queryValue = query[key].split(',');
      criteria[key] = { $regex: new RegExp(queryValue.join('|'), 'i') };
      return criteria;
    }, {});



    try {
      const results = await model.find(searchCriteria).exec();
      const totalCount = await model.countDocuments(searchCriteria).exec();
      return { data: results, totalCount }
    } catch (error) {
      console.error(`Error searching in category ${category}:`, error);
      throw new Error('Error searching for products');
    }
  }

  async createProducts(modelName: string, createProductsDto: any): Promise<any[]> {
    const model = this.getModel(modelName);

    // Filter out any products with null model field
    const validProducts = createProductsDto.filter(product => product.model !== null);

    if (validProducts.length === 0) {
      throw new HttpException('No valid products to save. Any product has a null model field.', HttpStatus.BAD_REQUEST);
    }

    if (validProducts.length > 1) {
      return await model.insertMany(validProducts);
    } else {
      const createdProduct = new model(validProducts[0]);
      await createdProduct.save();
      return [createdProduct];
    }
  }
  

  async findAllUids(category: string) {
    const model = this.getModel(category);
    const uids = await model.find({}, { uid: 1, _id: 0 }); // Project only the uid field
    return uids.map(doc => doc.uid); // Extract uid values from the documents and return as a flat array
  }

  async findByCategory(category: string, url: string[]): Promise<any[]> {
    const model = this.getModel(category);
    const result = await model.find({ url: { $in: url } });
    return result;
  }

  async findTopProducts(category: string) {
    const topProducts = await this.topProductModel.find({ 'type': category }).exec()
    return topProducts;
  }

  findUsersByNames(names: string[], category: string) {
    const model = this.getModel(category);
    return model.find({ image_navigation: { $in: names } }).exec();
  }

  async searchItems(query: any, category:string) {
    const items = await this.getModel(category).find({ filtering: new RegExp(query, 'i') });
    const totalCount = await this.getModel(category).countDocuments({ filtering: new RegExp(query, 'i') });
    return { data: items, totalCount };
  }

  async findMatchesInEveryField(category: string, searchString: string, sortBy: 'createdAt' | 'price' | '', sortOrder: 'asc' | 'desc' | '') {
    const searchTerms = searchString.split(/\s+/).filter(term => term.length > 0);

    // Create a query that ensures all search terms are present in the 'filtering' field
    const query = searchTerms.length > 0 ? {
        $and: searchTerms.map(term => ({
            filtering: { $regex: new RegExp(term, 'i') }
        }))
    } : {};

    // Fetch the products from the database that match the constructed query
    const queryBuilder = this.getModel(category).find(query);

    // Apply sorting if sortBy and sortOrder are not empty
    if (sortBy && sortOrder) {
        const order = sortOrder === 'asc' ? 1 : -1;
        queryBuilder.sort({ [sortBy]: order });
    }

    const items = await queryBuilder.exec();
    return items;
}



}
